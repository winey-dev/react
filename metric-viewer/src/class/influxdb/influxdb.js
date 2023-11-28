import { InfluxDB } from "@influxdata/influxdb-client";
import { BucketsAPI, OrgsAPI } from "@influxdata/influxdb-client-apis";
import { url, token, org } from "./config";
import QueryBuilder from "./querybuilder";

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

const sortField = (a,b) => {
  var ap = SortNumber(a);
  var bp = SortNumber(b);

  if (ap > bp) {
    return 1;
  } else if (ap < bp) {
    return -1;
  }
  return 0;
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
    // selected = {name, values, selectedValues, }
    // selectedOptions 이 [option0, option1, option2, option3, option4] 가 존재하고 index가 n이면 
    // (0 ~ index) 범위 내용으로 (index + 1  ~ selectOptions.length) 까지 반복 작업이 필요 
    // 새로운 결과에 0 ~ index 까지 내용 복사 
    /*
      for (let i = index + 1 ; i < selectOptions.length; i ++) {
        const fixedValues = []
        newOptions[i].values = await this.client.Get()
        for (let j = 0; j < newOptions[i].selectedValues.length; i++) {
          if (newOptions[i].values.indexOf(newOptions[i].selectedValues[j] > -1) {
              fixedValues.push(newOptions[i].selectedValues[j])
              newOptions[i].values.indexOf(newOptions[i].selectedValues = [...fixedValus]
          }
        }
      }
    */
    // category 또는 subcategory 변경 시 전체 구조를 변경하는것이 없음 .. 
    var newOptions = []
    if (index === 0 || index === 1) {
      var sliceOptions = [ ...selectOptions]
      newOptions = sliceOptions.slice(0, index+1)
      return await this.InitalizeOptions(newOptions[0].selectedValues[0], newOptions[1].selectedValues[0])
    } else {
      newOptions = [...selectOptions]
    }
   
  
    for (let i = index + 1; i < selectOptions.length; i++) {
      const fixedSelectValues = []
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
    console.log(newOptions)
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
      .measurment(options[0].selectedValues[0]+"_"+options[1].selectedValues[0])
      for (let i = 2; i < index; i ++) {
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
    }catch(e) {
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
      options.push({name: "category", multiple: false, values: [...categoryList], selectedValues: [categoryList[0]]})
      options.push({name: "subcategory", multiple: false, values: [...subCategoryList], selectedValues: [subCategoryList[0]]})
    } else if (categoryName && !subCategoryName) {
      const subCategoryList = await this.GetSubCategoryList(categoryName)
      options.push({name: "category", multiple: false, values: [...categoryList], selectedValues: [categoryName]})
      options.push({name: "subcategory", multiple: false, values: [...subCategoryList], selectedValues: [subCategoryList[0]]})
    } else if (categoryName && subCategoryName) {
      const subCategoryList = await this.GetSubCategoryList(categoryName)
      options.push({name: "category", multiple: false, values: [...categoryList], selectedValues: [categoryName]})
      options.push({name: "subcategory", multiple: false, values: [...subCategoryList], selectedValues: [subCategoryName]})
    }

    const tagNameList = await this.GetTagNameList(options[0].selectedValues[0], options[1].selectedValues[0])
    
    
   
    for (let i = 0 ; i < tagNameList.length; i++) {
      options.push({name: tagNameList[i], multiple: true})
    }
    
    for (let i = 2 ; i < options.length; i++ ) {
      const result =  await this.GetOptions(options, i)
      options[i].values = [...result]
      options[i].selectedValues = []
    }
    //console.log(options)
    return options
  }

  makeQuery(name, options) {
    const builder = new QueryBuilder()
    const categoryName = options[0].selectedValues[0]
    const subCategoryName = options[1].selectedValues[0]

    builder
    .from("realtime")
    .range("-1h", "now()")
    .measurment(categoryName + "_" + subCategoryName)
    
    for (let i = 2 ; i < options.length; i++) {
      builder.filter(options[i].name, options[i].selectedValues)
    }
    builder.yield(name)
    return builder.Builder()
  }
}

export default Client;
