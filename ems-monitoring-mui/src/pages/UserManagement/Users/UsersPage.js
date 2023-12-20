import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { Page, PageSection, PageHeader } from '../../../components/Page';

import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import { getUsers } from '../../../views/users';


const UsersPage = () => {

    const users = getUsers
    const navigate = useNavigate();

    const createHandle = () => {
        navigate('/user_management/users/create');
    }

    return (
        <Page title={"users"} sx={{ alignItems: 'center' }}>
            <PageHeader sx={{ height: '5%' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '25px', marginRight: 'auto' }}>
                    <Link underline="hover" color="inherit" href="/home">
                        Home
                    </Link>
                    <Typography fontSize={'25px'} color="text.primary">
                        Users
                    </Typography>
                </Breadcrumbs>
                <Button onClick={createHandle} variant="contained" sx={{ marginRight: '25px' }} >
                    Create
                </Button>
            </PageHeader>

            <PageSection sx={{ height: '90%' }}>
                <Table id='user_table' object={users} />
                {/* <TableContainer>
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
                </TableContainer> */}
            </PageSection>
        </Page>
    )
}

export default UsersPage;