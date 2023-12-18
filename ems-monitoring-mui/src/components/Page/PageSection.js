import { Box, useTheme } from '@mui/material';
import styled from 'styled-components';
import { grey } from '@mui/material/colors';
const WrapperPageSection = styled(Box)`
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[50] : grey[900]};
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