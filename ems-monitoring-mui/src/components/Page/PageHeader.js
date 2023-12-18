import { Box, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import styled from 'styled-components'

const WrapperPageHeader = styled(Box)`
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    display: flex;
    display-direction: row;
    align-items: center;
`

const PageHeader = (props) => {
    const { sx } = props
    const theme = useTheme();
    return (
        <WrapperPageHeader theme={theme} sx={sx}>
            {props.children && props.children}
        </WrapperPageHeader>
    )
}
export default PageHeader;