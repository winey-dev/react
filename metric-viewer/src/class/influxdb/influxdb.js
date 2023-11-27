import { InfluxDB } from "@influxdata/influxdb-client";
import { BucketsAPI, OrgsAPI } from "@influxdata/influxdb-client-apis";
import { url, token, org } from "./config";

const SortNumber = (str) => {
  const SortMAP = {
    item_name: 1,
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
        const subCategory = o._value.split("_");
        if (subCategory[0] === categoryName) {
          subCategoryList.push(subCategory[1]);
        }
      }

      const set = new Set(subCategoryList);
      return [...set];
    } catch (e) {
      console.log("get category failed. =%s", e.toString());
      throw new Error("get category failed.");
    }
  }
  async GetTagNameList(categoryName, subCategoryName) {
    const tagNameList = [];
    const measurement = categoryName.concat("_", subCategoryName);
    try {
      // 1. get measurment in 'realtime' bucket
      const queryAPI = this.client.getQueryApi(this.org);
      const fluxQuery = `
      import "regexp"
      from(bucket: "realtime")
      |> range(start: -1h, stop: now())
      |> filter(fn: (r) => (r["_measurement"] == "${measurement}"))
      |> keys()
      |> keep(columns: ["_value"])
      |> distinct()
      |> filter(fn: (r) => r._value != "_measurement")
      |> filter(fn: (r) => r._value != "_time" and r._value != "_start" and r._value !=  "_stop" and r._value != "_value")
      |> sort()
      |> limit(n: 1000)
              `;

      for await (const { values, tableMeta } of queryAPI.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        if (o._value === "_field") {
          tagNameList.push("item_name");
        } else {
          tagNameList.push(o._value);
        }
      }

      tagNameList.sort((a, b) => {
        var ap = SortNumber(a);
        var bp = SortNumber(b);
        if (ap > bp) {
          return 1;
        } else if (ap < bp) {
          return -1;
        }
        return 0;
      });
      return tagNameList;
    } catch (e) {
      console.log("get category failed. =%s", e.toString());
      throw new Error("get category failed.");
    }
  }
  // async GetTagNameList(categoryName, subCategoryName) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (categoryName === "resource") {
  //         if (subCategoryName === "node") {
  //           resolve(["item_name", "node_name"]);
  //         } else if (subCategoryName === "container") {
  //           resolve(["item_name", "namespace", "app_name", "pod_name", "container_name"]);
  //         } else if (subCategoryName === "network") {
  //           resolve(["item_name", "namespace", "app_name", "pod_name", "interface"]);
  //         }
  //       } else if (categoryName === "rest") {
  //         if (subCategoryName === "grpc") {
  //           resolve(["item_name", "namespace", "app_name", "pod_name", "container_name", "method", "status"]);
  //         } else if (subCategoryName === "http") {
  //           resolve(["item_name", "namespace", "app_name", "pod_name", "container_name", "url", "method", "status"]);
  //         }
  //       }
  //     }, 100);
  //   });
  // }

  async GetTagValueList(categoryName, subCategoryName, tagNameList) {
    return new Promise((resolve) => {
      const result = [];
      for (let i = 0; i < tagNameList.length; i++) {
        result.push(["item_1", "item2", "item3", "item4", "item5"]);
      }
      resolve(result);
    }, 100);
  }
}

export default Client;
