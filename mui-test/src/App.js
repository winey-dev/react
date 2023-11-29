import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import GetNext from './GetNext';
import {TimeSort} from './Util';
const makeKey = (object) => {
  var array = Object.entries(object)
  var key = ""
  array.forEach((value) => {
    if (value[0] === "_time" || value[0] === "_value") {
      return;
    }
    key += value[1]
  })
  return key
}

const getMetric = () => {
  const result = []
  const times = []
  const check = new Map()
  for (let i = 0 ; i < GetNext.length; i++) {
    var value = GetNext[i];
    var current = []
    const key = makeKey(value)
    if (check.has(key)) {
        current = check.get(key)
    } 
    times.push(value._time)
    current.push(value)
    check.set(key, current)
  }

  const set = new Set(times)
  const timeArray = [...set].sort(TimeSort)
  
  check.forEach((values) => {
    result.push(values)
  })

  // result 에서 보정이 시간 값에 대한 보정이 필요함 ?? 
  return dataCorrection(timeArray, result)
}

const dataCorrection = (timeArray, lineValues) => {
  const allCorrections = []
  for (let i = 0 ; i < lineValues.length; i++) {
    var values = lineValues[i]
    if (values.length === timeArray.length) {
      // timeArray, values의 길이가 같을 경우는 항상 같은 시간 값을 가짐
      allCorrections.push(values)
      continue
    }

    var corrections = []
    for (let j = 0; j < values.length; j++) {
      var timeIndex = timeArray.indexOf(values[j]._time)
      console.log(timeIndex, j)
      if (timeIndex === j) {
        // index 가 동일 하다는 것은같은 위치에 존재 한다는 의미
        corrections.push(values[j])
        continue;
      } 
  
      for (let k = 0 ; k < timeIndex - j; k++) {
        var dummyObject = {...values[j]}
        dummyObject._time = timeArray[timeIndex];
        dummyObject._value = null;
        corrections.push(dummyObject)
      }
      corrections.push(values[j])
    }
    allCorrections.push(corrections)
  }

  return allCorrections;
}

export default function App() {
  const linesValues = getMetric()  
  console.log(linesValues)
  return (
    <LineChart
      xAxis={[
        {scaleType:'point', data: ['a','b','c','d','e']},
        {scaleType:'point', data: ['1','2','3','4','5']},
      ]}
      series={[
        {label: "resource_container cpu_usage mss-ems mss-ems-elasticsearch mss-ems-elasticsearch-0 elasticsearch", data: [1,2,3,4,5]},
        {label: "resource_container cpu_usage mss-ems mss-ems-elasticsearch mss-ems-elasticsearch-1 elasticsearch", data: [11,22,33,44,55]},
      ]}
      width={250}
      height={250}
      slotProps={{
        legend: {
          direction: 'column',
          position: { vertical: 'bottom', horizontal: 'left' },
          padding: 10,
        },
      }}
    />
  );
}