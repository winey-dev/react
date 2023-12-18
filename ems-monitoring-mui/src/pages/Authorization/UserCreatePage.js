import { Page, PageSection, PageHeader } from '../../components/Page';

const UserCreatePage = () => {
    return (
        <Page title={"user create"} sx={{ alignItems: 'center' }}>
            <PageHeader sx={{ height: '5%' }}>

            </PageHeader>

            <PageSection sx={{ height: '90%' }}>
                Create User
            </PageSection>
        </Page>
    )
}

export default UserCreatePage;