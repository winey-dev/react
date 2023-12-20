import { TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const Table = (props) => {
    const { id, object } = props


    const columns = ["id", "name", "password", "identities"]
    console.log("columns", columns)
    const rows = Object.entries(object)
    console.log("rows", rows)
    return (
        <TableContainer>
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
                                <TableCell key={valueIndex}> {value[columns[valueIndex]]} </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default Table;