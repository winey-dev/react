import { ChartArray, FunctionArray } from '../../config/metric';
class QueryBox {
    constructor() {
        this.QueryColumns = []



        // this.QueryColumns.push(
        //     new QueryColumn()
        //         .setName("groupFunction")
        //         .setValues(FunctionArray)
        //         .selectedValues(FunctionArray[0])
        // );

        this.QueryColumns.push(
            new QueryColumn()
                .setName("chart")
                .setValues(ChartArray)
                .selectedValues(ChartArray[0])
        );

        this.QueryColumns.push(
            new QueryColumn()
                .setName("aggregationFunction")
                .setValues(FunctionArray)
                .selectedValues(FunctionArray[0])
        );
    }




}

class QueryColumn {
    constructor() {
        this.name;
        this.values = [];
        this.selectedValues = [];
        this.multiple = false;
        this.required = false;
    }

    setName(name) {
        this.name = name
        return this
    }
    setValues(values) {
        this.values = values;
        return this
    }
    setSelectedValues(selectedValues) {
        this.selectedValues = selectedValues
        return this
    }
    setMultiple(multiple) {
        this.multiple = multiple
        return this
    }
    setRequired(required) {
        this.required = required
    }

    getName() {
        return this.name
    }
    getValues() {
        return this.values
    }
    getSelectedValues() {
        return this.selectedValues
    }
    getMultiple() {
        return this.multiple
    }
    getRequired() {
        return this.required
    }
}

export default QueryBox;