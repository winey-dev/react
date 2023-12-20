import { Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import { Page, PageSection } from '../Components/Page';

const About = () => {
    return (
        <Page title='about' >
            <PageSection sx={{ marginBottom: '5px' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">About</Typography>
                </Breadcrumbs>
            </PageSection>
            <Divider />
            <PageSection>
                About Page 입니다.
            </PageSection>
        </Page>
    )
}

export default About;