class Schema {
  //https://hackids.tistory.com/135
  constructor() {
    this.schema = [
      {
        name: "resource",
        items: [
          {
            name: "node",
            items: [{ name: "item_name" }, { name: "node_name" }],
          },
          {
            name: "container",
            items: [{ name: "item_name" }, { name: "namespace" }, { name: "app_name" }, { name: "pod_name" }, { name: "container_name" }],
          },
          {
            name: "network",
            items: [{ name: "item_name" }, { name: "namespace" }, { name: "app_name" }, { name: "pod_name" }, { name: "interface" }],
          },
          {
            name: "disk",
            items: [{ name: "item_name" }, { name: "namespace" }, { name: "app_name" }, { name: "pod_name" }, { name: "volumn_name" }],
          },
        ],
      },
      {
        name: "rest",
        items: [
          {
            name: "grpc",
            items: [
              { name: "item_name" },
              { name: "namespace" },
              { name: "app_name" },
              { name: "pod_name" },
              { name: "container_name" },
              { name: "method" },
              { name: "status" },
            ],
          },
          {
            name: "http",
            items: [
              { name: "item_name" },
              { name: "namespace" },
              { name: "app_name" },
              { name: "pod_name" },
              { name: "container_name" },
              { name: "url" },
              { name: "method" },
              { name: "status_code" },
            ],
          },
        ],
      },
    ];
    this.items = {
      resource_node: [{ name: "cpu_usage" }, { name: "mem_usage" }, { name: "disk_usage" }],
      resource_container: [
        { name: "cpu_usage" },
        { name: "cpu_used_core" },
        { name: "mem_usage" },
        { name: "mem_used_bytes" },
        { name: "fd_num" },
        { name: "socket_num" },
        { name: "proc_num" },
        { name: "thread_num" },
      ],
      resource_network: [{ name: "ni_tx_total" }, { name: "ni_rx_total" }],
      resource_disk: [{ name: "disk_usage" }, { name: "disk_used_bytes" }, { name: "disk_capacity_bytes" }],
      rest_grpc: [{ name: "request" }, { name: "response" }],
      rest_http: [{ name: "request" }, { name: "response" }],
    };
    this.nodes = [
      { name: "infra1.cmsscl.cloud" },
      { name: "infra2.cmsscl.cloud" },
      { name: "master1.cmsscl.cloud" },
      { name: "master2.cmsscl.cloud" },
      { name: "worker1.cmsscl.cloud" },
      { name: "worker2.cmsscl.cloud" },
      { name: "worker3.cmsscl.cloud" },
    ];
    this.namespace = [{ name: "cmss-dev" }, { name: "mss-ems" }];
    this.appname = {
      "cmss-dev": [{ name: "CF" }, { name: "MF" }, { name: "RF" }, { name: "ABSF" }, { name: "ARDF" }],
      "mss-ems": [
        { name: "em-config" },
        { name: "em-ui" },
        { name: "em-mmc" },
        { name: "em-metric" },
        { name: "em-alert" },
        { name: "em-calltrace" },
      ],
    };
  }

  getCategoryList() {
    return [{ name: "resource" }, { name: "rest" }];
  }

  getSubCategoryList(categoryName) {
    for (let i = 0; i < this.schema.length; i++) {
      if (this.schema[i].name === categoryName) {
        return this.schema[i].items;
      }
    }
    return null;
  }

  getTagNameList(categoryName, subCategoryName) {
    for (let i = 0; i < this.schema.length; i++) {
      if (this.schema[i].name === categoryName) {
        //console.log("schema[%d].name=%s, %s ",i, this.schema[i].name,categoryName)
        for (let j = 0; j < this.schema[i].items.length; j++) {
          //console.log("schema[%d].items[%d].name=%s, %s", i, j, this.schema[i].items[j].name, subCategoryName)
          if (this.schema[i].items[j].name === subCategoryName) {
            //console.log(this.schema[i].items[j].items)
            return this.schema[i].items[j].items;
          }
        }
      }
    }
    return null;
  }

  getValueFromMap(selectMap, name) {
    if (selectMap) {
      // console.log(selectMap)
      return selectMap.get(name);
    } else {
      // console.log("selectmap is null")
    }

    return "";
  }

  getTagValues(selectMap, tag) {
    const categoryName = this.getValueFromMap(selectMap, "category");
    const subcategoryName = this.getValueFromMap(selectMap, "subcategory");
    switch (tag.name) {
      case "item_name":
        //     console.log(categoryName, subcategoryName, this.items[categoryName + "_" + subcategoryName])
        // const returnList = this.items[categoryName + "_" + subcategoryName];
        //return [...returnList]
        return this.items[categoryName + "_" + subcategoryName];
      case "node_name":
        return this.nodes;
      case "namespace":
        return this.namespace;
      case "app_name":
        const namespaces = this.getValueFromMap(selectMap, "namespace");
        if (namespaces) {
          const namespace = namespaces.split(",");
          const arr = [];
          for (let i = 0; i < namespace.length; i++) {
            arr.concat(namespace[i]);
          }
          return arr;
        }
        return [].concat(this.appname["cmss-dev"], this.appname["mss-ems"]);
      case "pod_name":
        return [{ name: "pod_1" }, { name: "pod_2" }];
      case "interface":
        return [{ name: "eth0" }, { name: "eth1" }];
      case "volumn_name":
        return [{ name: "config" }, { name: "data" }];
      default:
        return null;
    }
  }

  getListWithMap(key, queryMap) {
    if (key === "category") {
      return this.getCategoryList();
    } else if (key === "subCategory") {
      const categoryName = queryMap.get("category");
      return this.getSubCategoryList(categoryName);
    } else {
      return null;
    }
  }

  GetSchema() {
    return this.schema;
  }

  getItemListWithSelectItem(index, selectItem) {
    // { "name": "category", "multiple": false, values: ["resource"] },
  }
}

export default Schema;
