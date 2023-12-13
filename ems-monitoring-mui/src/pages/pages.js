import { useEffect } from 'react';

const Pages = ({ name }) => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = name
    }, [name])
    return (
        <h1> {name} Page 입니다.</h1>
    )
}
export default Pages;