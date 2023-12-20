import { Page, PageSection } from '../components/Page';
const Dummy = ({ name }) => {
    return (
        <Page title={name}>
            <PageSection>
                {name} Page 입니다.
            </PageSection>
        </Page >
    )
}
export default Dummy;