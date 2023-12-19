import { Page, PageSection, PageHeader } from '../../components/Page';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const UserCreatePage = () => {
    return (
        <Page title={"user create"} sx={{ alignItems: 'center' }}>
            <PageHeader sx={{ height: '5%' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '25px' }}>
                    <Link underline="hover" color="inherit" href="/home">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/authorization/users">
                        Users
                    </Link>
                    <Typography fontSize={'25px'} color="text.primary">
                        Create
                    </Typography>
                </Breadcrumbs>
            </PageHeader>

            <PageSection sx={{ height: '90%' }}>
                Create User
            </PageSection>
        </Page>
    )
}

export default UserCreatePage;