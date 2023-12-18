import { Page, PageSection } from '../components/Page';
import { Breadcrumbs, Link, Typography } from '@mui/material';
const Pages = ({ name }) => {
    return (
        <Page title={name}>
            <PageSection>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="#">
                        Home
                    </Link>
                    <Typography color="text.primary">{name}</Typography>
                </Breadcrumbs>
            </PageSection>
            <PageSection>
                {name} Page 입니다.
            </PageSection>
        </Page >
    )
}
export default Pages;