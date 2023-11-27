class Schema {
  //https://hackids.tistory.com/135
  constructor() {}

  async AsyncGetCategoryList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("set timeout call");
        resolve(["resource", "rest"]);
      }, 100);
    });
  }

  GetCategoryList() {
    return ["resource", "rest"];
  }

  async AsyncGetSubCategoryList(categoryName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (categoryName === "resource") {
          resolve(["node", "container", "network"]);
        } else if (categoryName === "rest") {
          resolve(["grpc", "http"]);
        }
        return null;
      }, 100);
    });
  }

  GetSubCategoryList(categoryName) {
    if (categoryName === "resource") {
      return ["node", "container", "network"];
    } else if (categoryName === "rest") {
      return ["grpc", "http"];
    }
    return null;
  }

  async AsyncGetTagNameList(categoryName, subCategoryName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (categoryName === "resource") {
          if (subCategoryName === "node") {
            resolve(["item_name", "node_name"]);
          } else if (subCategoryName === "container") {
            resolve(["item_name", "namespace", "app_name", "pod_name", "container_name"]);
          } else if (subCategoryName === "network") {
            resolve(["item_name", "namespace", "app_name", "pod_name", "interface"]);
          }
        } else if (categoryName === "rest") {
          if (subCategoryName === "grpc") {
            resolve(["item_name", "namespace", "app_name", "pod_name", "container_name", "method", "status"]);
          } else if (subCategoryName === "http") {
            resolve(["item_name", "namespace", "app_name", "pod_name", "container_name", "url", "method", "status"]);
          }
        }
      }, 100);
    });
  }

  GetTagNameList(categoryName, subCategoryName) {
    if (categoryName === "resource") {
      if (subCategoryName === "node") {
        return [("item_name", "node_name")];
      } else if (subCategoryName === "container") {
        return [("item_name", "namespace", "app_name", "pod_name", "container_name")];
      } else if (subCategoryName === "network") {
        return [("item_name", "namespace", "app_name", "pod_name", "interface")];
      }
    } else if (categoryName === "rest") {
      if (subCategoryName === "grpc") {
        return ["item_name", "namespace", "app_name", "pod_name", "container_name", "method", "status"];
      } else if (subCategoryName === "http") {
        return [("item_name", "namespace", "app_name", "pod_name", "container_name", "url", "method", "status")];
      }
    }
    return null;
  }

  async AsyncGetTagValueList(categoryName, subCategoryName, tagNameList) {
    return new Promise((resolve) => {
      const result = [];
      for (let i = 0; i < tagNameList.length; i++) {
        result.push(["item_1", "item2", "item3", "item4", "item5"]);
      }
      resolve(result);
    }, 100);
  }
}

export default Schema;
