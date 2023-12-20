import { Box } from '@mui/material';

const boxStyled = { marginLeft: '5px', marginRight: '5px', marginTop: '15px' }

const PageSection = (props) => {

    const { sx, children } = props;


    if (sx) {
        Object.assign(boxStyled, sx)
    }

    return (
        <Box sx={boxStyled}>
            {children && children}
        </Box>
    )
}

export default PageSection;