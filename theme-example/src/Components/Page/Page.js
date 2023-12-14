import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
const Page = (props) => {
    const { title, breadcrumbs, element } = props
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = title
    }, [title])
    const location = useLocation();
    console.log(location)
    return (
        <Box >
            {breadcrumbs && location}
            {element && element}
        </Box>
    )
}

export default Page;