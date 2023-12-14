import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import GetNext from './GetNext';
import { TimeSort } from './Util';

const getMetric = () => {
  const result = []
  const times = []
  const check = new Map()
  for (let i = 0; i < GetNext.length; i++) {
    var value = GetNext[i];
    var current = []
    var { _time, _value, ...meta } = value
    const keyArray = Object.values(meta)
    const key = keyArray.join("")
    if (check.has(key)) {
      current = check.get(key)
    }
    times.push(value._time)
    current.push(value)
    check.set(key, current)
  }

  check.forEach((values) => {
    result.push(values)
  })

  const set = new Set(times)
  const timeArray = [...set].sort(TimeSort)
  // result 에서 보정이 시간 값에 대한 보정
  return dataCorrection(timeArray, result)
}

const dataCorrection = (timeArray, lineValues) => {
  const allCorrections = []
  for (let i = 0; i < lineValues.length; i++) {
    var values = lineValues[i]
    var { _time, _value, ...meta } = values[0];
    var keyArray = Object.values(meta)

    if (values.length === timeArray.length) {
      // timeArray, values의 길이가 같을 경우는 항상 같은 시간 값을 가짐
      // values.length가 timeArray.length 보다 클 경우는 없음 
      // values to {label: connectNulls: true, data: [...data]} 형 변환 필요
      var data = values.forEach(v => v._value)
      allCorrections.push({ label: keyArray.join(" "), connectNulls: true, data: [...data] })
      continue
    }

    var corrections = []
    for (let j = 0; j < timeArray.length; j++) {
      var findIndex = values.findIndex(v => v._time === timeArray[j])
      if (findIndex < 0) {
        corrections.push(null)
      } else {
        corrections.push(values[findIndex]._value)
      }
    }
    allCorrections.push({ label: keyArray.join(" "), connectNulls: true, data: [...corrections] })
  }

  return {
    labels: timeArray,
    dataSets: allCorrections,
  };
}

export default function App() {
  const lineValues = getMetric()
  console.log(lineValues)
  return (
    <LineChart
      xAxis={[
        { scaleType: 'point', data: [...lineValues.labels] },
      ]}
      series={[
        ...lineValues.dataSets
      ]}
      width={lineValues.labels.length * 80}
      height={500}
      slotProps={{ legend: { hidden: true } }}
    />
  );
}