import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { Page, PageSection, PageHeader } from '../../../components/Page';

import { useNavigate } from 'react-router-dom';
import TableView from '../../../components/Table/TableView';
import { getUsers } from '../../../views/users';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { useState } from 'react';

const ErrorFallBack = ({ error, resetErrorBoundary }) => {
    return (
        <div>
            <h1>An error occurred: {error.message}</h1>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}
const UsersPage = () => {
    const [users, setUsers] = useState();
    const handleError = useErrorBoundary();
    const navigate = useNavigate();

    try {
        const newUsers = getUsers();
        if (newUsers) {
            setUsers(newUsers);
        }
    } catch (error) {
        handleError(error)
    }
    const createHandle = () => {
        navigate('/user_management/users/create');
    }

    return (
        <Page title={"users"} sx={{ alignItems: 'center' }}>
            <PageHeader sx={{ height: '5%' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '25px', marginLeft: '25px', marginRight: 'auto' }}>
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
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                    <TableView id='user_table' name='users' items={users} ignoreFields={['password']} />
                </ErrorBoundary>
            </PageSection>
        </Page>
    )
}

export default UsersPage;