import { AppBar, Toolbar } from '@mui/material'
import styled from 'styled-components'


// 컴포넌트 style 지정하기
const MyHeader = styled(AppBar)`
  &&& {
    display: flex;
    flex-direction: row;
    position: static;
  }
`
const MyToolbar = styled(Toolbar)`
    flex-grow: 1;
`

// html tag style 하기
const HeaderItem = styled.div`
    display: flex;
    flex-grow: 1;
`;

const Header = () => {
    return (
        <MyHeader>
            <MyToolbar>
                <HeaderItem> Button </HeaderItem>
                <HeaderItem> Name </HeaderItem>
            </MyToolbar>

            <MyToolbar>
                <HeaderItem> Button </HeaderItem>
            </MyToolbar>
        </MyHeader >
    )
}
export default Header;