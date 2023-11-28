import { InfluxDB } from "@influxdata/influxdb-client";
import { BucketsAPI, OrgsAPI } from "@influxdata/influxdb-client-apis";
import { url, token, org } from "./config";

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

  getOrgID() {
    try {
      const orgsAPI = new OrgsAPI(this.client);
      const organizations = orgsAPI.getOrgs({ org });
      if (!organizations || !organizations.orgs || !organizations.orgs.length) {
        console.error(`No organization named "${org}" found!`);
        throw new Error("get organization failed.");
      }
      organizations.then((value) => {
        this.origID = value.orgs[0].id;
      });
      //this.orgID = organizations.orgs[0].id;
      console.log("orgid=%s", this.orgID);
    } catch (e) {
      console.log("get orgID failed err=%s", e.toString());
      throw new Error("organization get failed");
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

  async GetTagValues (categoryName, subCategoryName, tagName) {
    const measurement = categoryName.concat("_", subCategoryName);
    const queryAPI = this.client.getQueryApi(this.org);
    try {
        const tagValues = [];
        const fluxQuery = `import "regexp"
        from(bucket: "realtime")
        |> range(start: -1m, stop: now())
        |> filter(fn: (r) => (r["_measurement"] == "${measurement}"))
        |> keep(columns: ["${tagName}"])
        |> group()
        |> distinct(column: "${tagName}")
        |> limit(n: 1000)
        |> sort()`;       
        for await (const { values, tableMeta } of queryAPI.iterateRows(fluxQuery)) {
          const o = tableMeta.toObject(values);
          tagValues.push(o._value)
        }
        return tagValues
    }catch(e) {
      console.log("get tag ValueList failed. =%s", e.toString());
      throw new Error("get tag ValueList failed."); 
    } 
  }

  async GetTagValueList(categoryName, subCategoryName, tagNameList) {
    const tagValueList = [];
    const measurement = categoryName.concat("_", subCategoryName);
    const queryAPI = this.client.getQueryApi(this.org);

    try {
      for (let i = 0; i < tagNameList.length; i++) { 
        const values = [];
        const tagName = tagNameList[i]
        const fluxQuery = `import "regexp"
        from(bucket: "realtime")
        |> range(start: -1m, stop: now())
        |> filter(fn: (r) => (r["_measurement"] == "${measurement}"))
        |> keep(columns: ["${tagName}"])
        |> group()
        |> distinct(column: "${tagName}")
        |> limit(n: 1000)
        |> sort()`;
        console.log(fluxQuery)
        for await (const { result, tableMeta } of queryAPI.iterateRows(fluxQuery)) {
          const o = tableMeta.toObject(result);
          console.log(o._value)
          values.push(o._value)
        }
        console.log(values)
        tagValueList.push(values)
      }
      console.log(tagValueList)
      return tagValueList;
    }catch(e) {
      console.log("get tag ValueList failed. =%s", e.toString());
      throw new Error("get tag ValueList failed."); 
    } 
  }

  async getSchema() {
    const result = [
      {name: "category", multiple: false, values: []},
      {name: "subcategory", multiple: false, values: []}
    ];

    // {name: category, multiple: }
  }
}

export default Client;
