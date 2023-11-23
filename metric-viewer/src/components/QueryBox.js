const QueryBox = (props) => {
    const { inputQueryBox} = props;
    console.log(inputQueryBox)

    inputQueryBox.set("category", "2")

    return (
        <div>
            <h1>
                MetricBox {props.children}
            </h1>
          
        </div>

    )
}

export default QueryBox;