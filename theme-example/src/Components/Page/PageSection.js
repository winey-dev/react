import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
const PageSection = (props) => {
    const theme = useTheme();
    const bgColor = theme.palette.mode === 'dark' ? grey[500] : grey[100]
    return (
        <Box sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '25px', backgroundColor: bgColor }}>
            {props.children && props.children}
        </Box>
    )
}

export default PageSection;