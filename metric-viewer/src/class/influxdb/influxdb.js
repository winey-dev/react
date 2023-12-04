import { InfluxDB } from "@influxdata/influxdb-client";
import { url, token, org } from "./config";
import QueryBuilder from "./querybuilder";
const TimeSort = (a, b) => {
  const aData = new Date(a)
  const bData = new Date(b)
  if (aData.getTime() < bData.getTime()) {
    return -1;
  }
  return 0;
}
const SortNumber = (str) => {
  const SortMAP = {
    _field: 1,
    node_name: 2,
    namespace: 3,
    app_name: 4,
    pod_name: 5,
    container_name: 6,
  };

  const val = SortMAP[str];
  if (val) {
    return val;
  }
  return 9999;
};

const requiredField = (name) => {
  const required = ["_field", "node_name", "namespace", "app_name"]
  if (required.indexOf(name) > -1) {
    return false;
  }
  return true;
}

class Client {
  constructor() {
    this.url = url;
    this.token = token;
    this.org = org;

    try {
      this.client = new InfluxDB({
        url: url,
        token: token,
      });
      //this.getOrgID();
    } catch (e) {
      throw e;
    }
  }

  async GetCategoryList() {
    const categoryList = [];
    try {
      // 1. get measurment in 'realtime' bucket
      const queryAPI = this.client.getQueryApi(this.org);
      const fluxQuery = `
              import "regexp"
                  from(bucket: "realtime") 
                  |> range(start: -5m, stop: now())
                  |> filter(fn: (r) => true)
                  |> keep(columns: ["_measurement"])
                  |> group()
                  |> distinct(column: "_measurement")
                  |> limit(n: 1000)
                  |> sort()
              `;

      for await (const { values, tableMeta } of queryAPI.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        const category = o._value.split("_");
        categoryList.push(category[0]);
      }
      const set = new Set(categoryList);
      return [...set];
    } catch (e) {
      console.log("get category failed. =%s", e.toString());
      throw new Error("get category failed.");
    }
  }

  async GetSubCategoryList(categoryName) {
    const subCategoryList = [];
    try {
      // 1. get measurment in 'realtime' bucket
      const queryAPI = this.client.getQueryApi(this.org);
      const fluxQuery = `import "regexp"
                  from(bucket: "realtime") 
                  |> range(start: -1h, stop: now())
                  |> filter(fn: (r) => true)
                  |> keep(columns: ["_measurement"])
                  |> group()
                  |> distinct(column: "_measurement")
                  |> limit(n: 1000)
                  |> sort()`;

      for await (const { values, tableMeta } of queryAPI.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        const subCategory = o._value.split("_");
        if (subCategory[0] === categoryName) {
          subCategoryList.push(subCategory[1]);
        }
      }

      const set = new Set(subCategoryList);
      return [...set];
    } catch (e) {
      console.log("get sub category failed. =%s", e.toString());
      throw new Error("get sub category failed.");
    }
  }

  async GetTagNameList(categoryName, subCategoryName) {
    const tagNameList = [];
    const measurement = categoryName.concat("_", subCategoryName);
    try {
      // 1. get measurment in 'realtime' bucket
      const queryAPI = this.client.getQueryApi(this.org);
      const fluxQuery = `import "regexp"
      from(bucket: "realtime")
      |> range(start: -1h, stop: now())
      |> filter(fn: (r) => (r["_measurement"] == "${measurement}"))
      |> keys()
      |> keep(columns: ["_value"])
      |> distinct()
      |> filter(fn: (r) => r._value != "_measurement")
      |> filter(fn: (r) => r._value != "_time" and r._value != "_start" and r._value !=  "_stop" and r._value != "_value")
      |> sort()
      |> limit(n: 1000)`;

      for await (const { values, tableMeta } of queryAPI.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        tagNameList.push(o._value);
      }

      return tagNameList.sort((a, b) => {
        var ap = SortNumber(a);
        var bp = SortNumber(b);

        if (ap > bp) {
          return 1;
        } else if (ap < bp) {
          return -1;
        }
        return 0;
      });

    } catch (e) {
      console.log("get tagNameList failed. =%s", e.toString());
      throw new Error("get tagNameList failed.");
    }
  }

  async schemaWithSelectOption(selectOptions, index) {
    var newOptions = []
    if (index === 0 || index === 1) {
      var sliceOptions = [...selectOptions]
      newOptions = sliceOptions.slice(0, index + 1)
      return await this.InitalizeOptions(newOptions[0].selectedValues[0], newOptions[1].selectedValues[0])
    } else {
      newOptions = [...selectOptions]
    }


    for (let i = index + 1; i < selectOptions.length; i++) {
      const fixedSelectValues = []
      if (newOptions[i].name === "group" || newOptions[i].name === "groupMerge" || newOptions[i].name === 'aggregationFn' || newOptions[i].name === 'chart') {
        continue
      }
      const fixedValues = await this.GetOptions(newOptions, i)
      newOptions[i].values = [...fixedValues]

      for (let j = 0; j < newOptions[i].selectedValues.length; j++) {
        if (newOptions[i].values.indexOf(newOptions[i].selectedValues[j]) > -1) {
          fixedSelectValues.push(newOptions[i].selectedValues[j])
        }
      }

      if (fixedSelectValues.length !== 0) {
        newOptions[i].selectedValues = [...fixedSelectValues]
      } else {
        if (!newOptions[i].multiple) {
          newOptions[i].selectedValues = [newOptions[i].values[0]]
        } else {
          newOptions[i].selectedValues = []
        }
      }
    }
    return newOptions
  }

  async GetOptions(options, index) {
    const result = []
    try {
      const queryAPI = this.client.getQueryApi(this.org);
      if (index === 0) {
        return await this.GetCategoryList()
      } else if (index === 1) {
        return await this.GetSubCategoryList(options[0].selectedValues[0])
      }

      const builder = new QueryBuilder()
      builder
        .from("realtime")
        .range("-1h", "now()")
        .measurment(options[0].selectedValues[0] + "_" + options[1].selectedValues[0])
      for (let i = 2; i < index; i++) {
        builder.filter(options[i].name, options[i].selectedValues)
      }
      builder
        .keepColumns([options[index].name])
        .group()
        .distinct(options[index].name)
        .limit(1000)
        .sort()
      // console.log("query=", builder.Builder())

      for await (const { values, tableMeta } of queryAPI.iterateRows(builder.Builder())) {
        const o = tableMeta.toObject(values);
        result.push(o._value)
      }
    } catch (e) {
      console.log("get options failed. ", e.toString())
      throw new Error("get options failed.")
    }
    return result
  }

  async InitalizeOptions(categoryName, subCategoryName) {
    const options = [] // {name: "", multiple: true, values: [], selectedValues: []}
    const categoryList = await this.GetCategoryList()
    if (!categoryName && !subCategoryName) {
      const subCategoryList = await this.GetSubCategoryList(categoryList[0])
      options.push({ name: "category", multiple: false, values: [...categoryList], selectedValues: [categoryList[0]], additional: false })
      options.push({ name: "subcategory", multiple: false, values: [...subCategoryList], selectedValues: [subCategoryList[0]], additional: false })
    } else if (categoryName && !subCategoryName) {
      const subCategoryList = await this.GetSubCategoryList(categoryName)
      options.push({ name: "category", multiple: false, values: [...categoryList], selectedValues: [categoryName], additional: false })
      options.push({ name: "subcategory", multiple: false, values: [...subCategoryList], selectedValues: [subCategoryList[0]], additional: false })
    } else if (categoryName && subCategoryName) {
      const subCategoryList = await this.GetSubCategoryList(categoryName)
      options.push({ name: "category", multiple: false, values: [...categoryList], selectedValues: [categoryName], additional: false })
      options.push({ name: "subcategory", multiple: false, values: [...subCategoryList], selectedValues: [subCategoryName], additional: false })
    }

    const tagNameList = await this.GetTagNameList(options[0].selectedValues[0], options[1].selectedValues[0])



    for (let i = 0; i < tagNameList.length; i++) {
      options.push({ name: tagNameList[i], multiple: true, values: [], selectedValues: [], additional: false })
    }

    for (let i = 2; i < options.length; i++) {
      const result = await this.GetOptions(options, i)
      options[i].values = [...result]
      options[i].selectedValues = []
      options[i].additional = requiredField(options[i].name)
    }

    const tagList = [];
    Object.values(options).forEach((value) => {
      if ((value.name === "category") || (value.name === "subcategory") || (value.name === "_field")) {
        return;
      }
      tagList.push(value.name)
    })

    if (tagList.length > 1) {
      options.push({ name: "group", multiple: true, values: [...tagList], selectedValues: [], additional: true })
      options.push({ name: "groupMerge", multiple: false, values: ["sum", "min", "max", "mean", "last", "frist"], selectedValues: ["sum"], additional: true })

    }
    options.push({ name: "aggregationFn", multiple: false, values: ["sum", "min", "max", "mean", "last", "frist"], selectedValues: ["sum"], additional: true })
    options.push({ name: "chart", multiple: false, values: ["line", "area"], selectedValues: ["line"], additional: true })

    return options
  }

  makeQuery(name, options, aggregateWindow) {
    const builder = new QueryBuilder()
    const categoryName = options[0].selectedValues[0]
    const subCategoryName = options[1].selectedValues[0]
    const defaultGroupList = ["_time", "_measurment", "_field"]

    builder
      .from("realtime")
      .range("-30m", "now()")
      .measurment(categoryName + "_" + subCategoryName)

    for (let i = 2; i < options.length; i++) {
      if (options[i].name === "group" || options[i].name === "groupMerge" || options[i].name === 'aggregationFn' || options[i].name === 'chart') {
        continue
      }
      builder.filter(options[i].name, options[i].selectedValues)
    }

    if (aggregateWindow) {
      if (aggregateWindow.period !== 'raw') {
        const aggrFn = options.findIndex(value => value.name === "aggregationFn")
        builder.aggregateWindow(
          aggregateWindow.period,
          options[aggrFn].selectedValues[0],
          aggregateWindow.createEmpty
        )
        if (aggregateWindow.fill) {
          builder.fill(aggregateWindow.fill)
        }
      }
    }

    const groupIndex = options.findIndex(value => value.name === "group")
    const mergedIndex = options.findIndex(value => value.name === "groupMerge")
    if (groupIndex != -1 && mergedIndex != -1) {
      if (options[groupIndex].selectedValues.length !== 0) {
        const groupColumns = [...defaultGroupList, ...options[groupIndex].selectedValues]
        builder.groupColumns(groupColumns)
        builder.groupFn(options[mergedIndex].selectedValues[0])
        groupColumns.splice(0, 1)
        builder.groupColumns(groupColumns)
      }
    }

    builder.yield(name)
    return builder.Builder()
  }

  // async getMetricData(query) {
  //   const result = []
  //   const queryAPI = this.client.getQueryApi(this.org);
  //   for await (const { values, tableMeta } of queryAPI.iterateRows(query)) {
  //     const o = tableMeta.toObject(values);
  //     result.push(o)
  //   }
  //   return result
  // }

  async getMetricData(query) {
    const result = []
    const times = []
    const check = new Map()
    const queryAPI = this.client.getQueryApi(this.org);
    for await (const { values, tableMeta } of queryAPI.iterateRows(query)) {
      const o = tableMeta.toObject(values);
      var current = []
      var { _time, _value, table, ...meta } = o
      const keyArray = Object.values(meta)
      const key = keyArray.join("")
      if (check.has(key)) {
        current = check.get(key)
      }
      times.push(o._time)
      current.push(o)
      check.set(key, current)
    }

    check.forEach((values) => {
      result.push(values)
    })

    const set = new Set(times)
    const timeArray = [...set].sort(TimeSort)
    // result 에서 보정이 시간 값에 대한 보정
    return this.dataCorrection(timeArray, result)
  }

  dataCorrection(timeArray, lineValues) {
    const allCorrections = []
    for (let i = 0; i < lineValues.length; i++) {
      const corrections = []
      var values = lineValues[i]
      var { _time, _start, _stop, _value, table, ...meta } = values[0];
      var keyArray = Object.values(meta)
      if (values.length === timeArray.length) {
        // timeArray, values의 길이가 같을 경우는 항상 같은 시간 값을 가짐
        // values.length가 timeArray.length 보다 클 경우는 없음 
        // values to {label: connectNulls: true, data: [...data]} 형 변환 필요
        // console.log(values)
        values.forEach((v) => (corrections.push(v._value)))

        allCorrections.push({ label: keyArray.join(" "), showMark: false, connectNulls: true, data: [...corrections] })
        continue
      }

      for (let j = 0; j < timeArray.length; j++) {
        var findIndex = values.findIndex(v => v._time === timeArray[j])
        if (findIndex < 0) {
          corrections.push(null)
        } else {
          corrections.push(values[findIndex]._value)
        }
      }

      allCorrections.push({ label: keyArray.join(" "), showMark: false, connectNulls: true, data: [...corrections] })
    }
    return {
      labels: timeArray,
      dataSets: allCorrections,
    };
  }
}
export default Client;
