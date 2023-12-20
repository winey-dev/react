import { Box } from '@mui/material'
import styled from 'styled-components'

const WrapperPageHeader = styled(Box)`
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    display-direction: row;
    align-items: center;
`

const PageHeader = (props) => {
    const { sx } = props

    return (
        <WrapperPageHeader sx={sx}>
            {props.children && props.children}
        </WrapperPageHeader>
    )
}
export default PageHeader;