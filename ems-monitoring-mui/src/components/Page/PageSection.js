import { Box, useTheme } from '@mui/material';
import styled from 'styled-components';
const WrapperPageSection = styled(Box)`
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
`
const PageSection = (props) => {
    const { sx } = props;
    const theme = useTheme();

    return (
        <WrapperPageSection theme={theme} sx={sx}>
            {props.children && props.children}
        </WrapperPageSection>
    )
}

export default PageSection;