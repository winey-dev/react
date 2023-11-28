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
  async schemaWithSelectOption (selectOptions, index) {
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

      const newOptions = [...selectOptions]
      for (let i = index + 1; i < selectOptions.length; i++) {    
        const fixedSelectValues = []
        const fixedValues = await this.GetOptions(newOptions, i)
        if (!fixedValues || !fixedValues.length) {
          continue
        }
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
            newOptions[i].selectedValues = [ newOptions[i].values[0]]
          } else {
            newOptions[i].selectedValues = []
          }
         
        }
      }
      return newOptions
  }
  async GetOptions(options, index) {

    for (let i = 0 ; i < index ; i ++) {
      console.log(options[i].name, options[i].selectedValues)
    }

    console.log("fixed ")

    if (options[index-1].selectedValues[0] === 'resource') {
      return ["container", "network", "node"]
    } 
    return ["grpc", "http"]
  } 
}

export default Client;
