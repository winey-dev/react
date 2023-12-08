const SelectPeriod = {
    "realtime": ['5s', '10s', '15s', '30s'],
    "1min": ['1min', '5min', '10min', '15min'],
    "5min": ['5min', '10min', '15min'],
    "hour": ['hour'],
    "day": ['day'],
    "month": [],
    "year": [],
}

const ChartArray = ['line', 'area', 'bar', 'table']
const FieldOptional = {
    "node_name": { required: true, priority: 1 },
    "namespace": { required: true, priority: 2 },
    "app_name": { required: true, priority: 3 },
    "_field": { name: "item_name", required: true, priority: 4 },
    "pod_name": { required: false, priority: 5 },
    "container_name": { required: false, priority: 6 },
}

const FunctionArray = ['sum', 'avg', 'min', 'max', 'last', 'frist']

export { SelectPeriod, ChartArray, FieldOptional, FunctionArray }