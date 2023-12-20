import { useEffect } from 'react'
import { Box } from '@mui/material'
import styled from 'styled-components'
import { grey } from '@mui/material/colors'
import { useTheme } from '@emotion/react'



const WrapperPage = styled(Box)`
    margin: 0px;
    margin-left: 5px;
    width: 100%;
    // background-color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[900] : grey[50]} 
`
const Page = (props) => {
    const { title, sx } = props
    const theme = useTheme();
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = title
    }, [title])

    return (
        <WrapperPage theme={theme} sx={sx}>
            {props.children && props.children}
        </WrapperPage>
    )
}

export default Page;