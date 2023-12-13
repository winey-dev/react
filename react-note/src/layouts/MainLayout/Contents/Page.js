import { useEffect } from 'react'

import { Box } from '@mui/material'
const BoxStyle = {
    width: '100%',
    height: '100%',
    backgrounColor: '#fff'
}

const Page = ({ title, element }) => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = title
    }, [title])

    return (
        <Box sx={BoxStyle}>
            {element && element}
        </Box>
    )
}

export default Page;