import { InfluxDB } from "@influxdata/influxdb-client";
import { BucketsAPI, OrgsAPI } from "@influxdata/influxdb-client-apis";
import { url, token, org } from "./config";
/// old 버전이다.
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
      this.getOrgID();
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
      this.orgID = organizations.orgs[0].id;
      console.log("orgid=%s", this.orgID);
    } catch (e) {
      console.log("get orgID failed err=%s", e.toString());
      throw new Error("organization get failed");
    }
  }

  async GetSchemaInfo() {
    const map = new Map();
    try {
      // 1. {category}_{period} paring from buckets parsing
      const bucketAPI = new BucketsAPI(this.client);
      const buckets = await bucketAPI.getBuckets({ orgID: this.orgID });
      if (!(buckets && buckets.buckets && buckets.buckets.length)) {
        throw new Error("get buckets failed.");
      }

      for (let i = 0; i < buckets.buckets.length; i++) {
        const bucket = buckets.buckets[i];

        if (bucket.name.includes("realtime")) {
          if (bucket.name === "realtime") {
            continue;
          }
          const category = bucket.name.split("_");
          map.set(category[0] + "(*)", []);
        }
      }

      // 2. get measurment in 'realtime' bucket
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
        if (!map.has(category[0])) {
          map.set(category[0], []);
        }

        var items = map.get(category[0]);
        items.push(category[1]);
        map.set(category[0], items);
      }
    } catch (e) {
      console.log("get category failed. =%s", e.toString());
      throw new Error("get category failed.");
    }

    return map;
  }
}
