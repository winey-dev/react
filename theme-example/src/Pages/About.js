import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Page, PageSection } from '../Components/Page';

const About = () => {
    return (
        <Page title='about'>
            <PageSection>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '25px' }}>
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary" fontSize={'inherit'}>About</Typography>
                </Breadcrumbs>
            </PageSection>
            <PageSection>
                About Page 입니다.
            </PageSection>
        </Page>
    )
}

export default About;