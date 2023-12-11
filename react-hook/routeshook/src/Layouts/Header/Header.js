const Header = ({ title, onClick }) => {

    return (
        <div className='header'>
            <button onClick={onClick}> MENU </button>
        </div>
    )
}

export default Header;