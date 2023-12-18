import { Box, Breadcrumbs, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Page, PageSection, PageHeader } from '../../components/Page';
import styled from 'styled-components';
import { getUsers } from '../../views/users';


const LeftBox = styled(Box)`
    height: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    margin-left: 50px;
    align-items: center;
`
const RightBox = styled(Box)`
    height: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: row-reverse;
    margin-right: 50px;
    align-items: center;
`

const UsersPage = () => {

    const users = getUsers;

    return (
        <Page title={"users"} sx={{ alignItems: 'center' }}>
            <PageHeader sx={{ height: '5%' }}>
                <LeftBox >
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '25px' }}>
                        <Link underline="hover" color="inherit" href="/home">
                            Home
                        </Link>
                        <Typography fontSize={'25px'} color="text.primary">
                            Users
                        </Typography>
                    </Breadcrumbs>
                </LeftBox>
                <RightBox >
                    <Button component={Link} to='/authorization/users/create' variant="contained" >
                        Create
                    </Button>
                </RightBox>
            </PageHeader>

            <PageSection sx={{ height: '90%' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 150 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Identities</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell> {row.id} </TableCell>
                                    <TableCell> {row.name} </TableCell>
                                    <TableCell> {row.identities} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PageSection>
        </Page>
    )
}

export default UsersPage;