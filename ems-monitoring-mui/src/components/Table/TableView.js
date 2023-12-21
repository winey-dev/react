import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const TableView = (props) => {
    const { id, name, items, ignoreFields } = props
    var rows = []
    var columns = []

    items.forEach(item => {
        const keys = Object.keys(item).filter((v) => {
            if (!ignoreFields || !ignoreFields.length || ignoreFields.length === 0) {
                return true;
            }
            if (ignoreFields.indexOf(v) === -1) {
                return true;
            }
            console.log(ignoreFields.indexOf(v))
            console.log("ignore field find ", v)
            return false;
        })
        if (columns.length === 0) {
            columns = [...keys]
        }
        const row = []
        columns.forEach((v) => {
            row.push(item[v])
        })
        rows.push(row)
    });
    console.log("columns", columns)
    console.log("rows", rows)
    return (

        <TableContainer id={name}>
            <Table aria-label={id}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column}> {column} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {row.map((value, valueIndex) => (
                                <TableCell key={valueIndex}> {value} </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default TableView;