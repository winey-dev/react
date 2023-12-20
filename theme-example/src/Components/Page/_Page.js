import { useEffect } from 'react'
import { Box } from '@mui/material'


const Page = (props) => {
    const { title } = props

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = title
    }, [title])


    return (
        <Box sx={{ margin: '4px', width: '100%' }}>

            {props.children && props.children}
        </Box>
    )
}

export default Page;