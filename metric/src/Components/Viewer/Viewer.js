import './Viewer.css'
const Viewer = (props) => {

    return (
        <div className='Viewer'>
            {props.children && props.children}
        </div>
    )
}
export default Viewer;