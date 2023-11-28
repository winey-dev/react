class QueryBuilder {
    constructor() {
        this.items = [];
        this.filters = [];
        this.groupTagNames = [];
    }

    Period(period) {
        this.period = period;
        return this;
    }

    Range(start, end) {
        this.startTime = start;
        this.endTime = end;
        return this;
    }

    Category(categoryName) {
        this.categoryName = categoryName;
        return this;
    }

    SubCategory(subCategoryName) {
        this.subCategoryName = subCategoryName;
        return this;
    }

    Items(items) {
        this.items = items;
        return this;
    }

    Filter(filterObject) {
        this.filters.push(filterObject)
        return this;
    }

    Group(groupObject) {
        this.groupTagNames = groupObject.tagNames;
        this.fn = groupObject.fnName;
        return this;
    }

    Yield(yieldName) {
        this.yield = yieldName;
        return this;
    }

    Builder() {
        if (this.period === '' || this.categoryName === '' || this.subCategoryName === '' || this.items.length === 0 || this.yield === '') {
            throw new Error("required field check (category,subcategory,items)");
        }

        var query = "";
        query += "from(bucket: \"" + this.period + "\")\n"


        if (!this.startTime || !this.endTime) {
            let now = new Date();
            this.endTime = now;
            this.startTime = new Date(this.endTime)
            this.startTime.setMinutes(this.endTime.getMinutes() - 60);
        }
    
        query += "  |> range(start: " + this.startTime.toISOString()+ ", stop: " + this.endTime.toISOString() + ")\n"


        query += "  |> filter(fn: (r) => r._measurement == \"" + this.categoryName + "_" + this.subCategoryName + "\")\n"
        query += "  |> filter(fn: (r) => "

        for (let i = 0; i < this.items.length; i++) {
           query += "r._field == \"" + this.items[i] + "\""
           if (i !== this.items.length-1) {
            query += " or "
           }
        }
        query += ")"

        for (let i = 0; i < this.filters.length; i++) {
            query += "  |> filter(fn: (r) => "
            for (let j = 0; j < this.filters[i].tagValues.length; j++) {
                query += "r." + this.filters[i].tagName + "  == \"" + this.filters[i].tagValues[j] + "\""
                if (j !== this.filters[i].tagValues.length - 1) {
                    query += " or "
                }
            }
            query += ")\n"
        }

        if (this.groupTagNames.length !== 0 ) {
            query += "  |> group(columns: [\"_measurement\", \"_time\", \"_field\", "
            for (let i = 0; i < this.groupTagNames.length; i++) {
                query += "\"r." + this.groupTagNames[i] + "\""
                if (i !== this.groupTagNames.length - 1) {
                    query += ", "
                }
            }
            query += ")\n"
            query += "  |> " + this.fn + "()\n"
        }

        query += "  |> yield(name: \"" + this.yield + "\")\n" 

        return query
    }
}

export default QueryBuilder;