import { Box } from '@mui/material';
import Header from './Header';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
const MainStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}

const Main = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Body = styled(Box)`
    display: flex;
    flex-direction: row;
    height: 100%;
`

const MainLayout = () => {
    const [toggle, setToggle] = useState('open')
    const onToggle = () => {
        toggle === 'open' ? setToggle('close') : setToggle('open')

    }

    // Header SideMenu 구조로 작성
    return (
        <Main sx={MainStyle}>
            <Header onToggle={onToggle} />
            <Body >
                <SideMenu toggle={toggle} />
                <Outlet />
            </Body>
        </Main>
    )
}
export default MainLayout;