class QueryBuilder {
    constructor() {
        this.fluxQuery = ''
    }

    from(bucket) {
        this.fluxQuery += `from(bucket: "${bucket}")\n`
        return this
    }

    range(start, end) {
        this.fluxQuery += ` |> range(start: ${start}, stop: ${end})\n`
        return this
    }
    measurment(measurment) {
        this.fluxQuery += ` |> filter(fn: (r) => (r["_measurement"] == "${measurment}"))\n`
        return this
    }

    filter(tagName, tagValues) {
        if (!tagValues || !tagValues.length) {
            return this
        }
        this.fluxQuery += ` |> filter(fn: (r) => (`
        for (let i = 0; i < tagValues.length; i++) {
            this.fluxQuery += `r["${tagName}"] == "${tagValues[i]}"`
            if (i !== tagValues.length - 1) {
                this.fluxQuery += " or "
            }
        }
        this.fluxQuery += `))\n`
        return this
    }

    keepColumns(columns) {
        this.fluxQuery += ` |> keep(columns: ["${columns.join(",")}"])\n`
        return this
    }
    group() {
        this.fluxQuery += ` |> group()\n`
        return this
    }

    groupColumns(columns) {
        // |> group(columns: ["_time","_measurement", "_field", "namespace", "app_name", "pod_name"])
        this.fluxQuery += ` |> group(columns: [`
        for (let i = 0; i < columns.length; i++) {
            this.fluxQuery += `"${columns[i]}"`
            if (i !== columns.length - 1) {
                this.fluxQuery += ", "
            }
        }
        this.fluxQuery += ` ])\n`
        return this
    }

    groupFn(fn) {
        this.fluxQuery += ` |> ${fn}(column: "_value")\n`
        return this
    }

    aggregateWindow(period, fn, createEmpty) {
        this.fluxQuery += `|> aggregateWindow(every: ${period}, fn: ${fn}, createEmpty: ${createEmpty})`
        return this
    }

    distinct(name) {
        this.fluxQuery += ` |> distinct(column: "${name}")\n`
        return this
    }

    limit(n) {
        this.fluxQuery += ` |> limit(n: ${n})\n`
        return this
    }

    sort() {
        this.fluxQuery += ` |> sort()\n`
        return this
    }

    yield(name) {
        this.fluxQuery += ` |> yield(name: "${name}")`
        return this
    }
    Builder() {
        return this.fluxQuery
    }
}

export default QueryBuilder;