import { useState } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
// import users from '../features/Users/users';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../app/services/authAPI';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLogout } from '../features/Users/users';

const Logout = () => {
    const [show, setShow] = useState(false)

    const [logoutUser] = useLogoutUserMutation()
    const dispatch = useAppDispatch()
    const { email } = useAppSelector(state => state.user)
    
    const navigate = useNavigate()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handleLogout
    const userLogOut = () => {
        dispatch(setLogout())
        handleClose()
        logoutUser()
        navigate("/")
    }


    return (
        <>
            <Card className='center-element' style={{ width: "min(320px , 100%)" }}>
                <Card.Header className='bg-info text-white' style={{fontSize: '18px'}}>LogOut</Card.Header>
                <Card.Body>
                    <Card.Title>Dear {email}</Card.Title>
                    <Card.Text>
                        Do You want to <span style={{ fontSize: '17px' }} className='text-danger font-weight-bold'>Log-Out ?</span>
                    </Card.Text>
                    <Link to={"/"} className='me-3'>
                        <Button variant="primary" className='px-4 py-1 me-4'>No</Button>
                    </Link>
                    <Button variant="primary" className='px-4 py-1' onClick={handleShow}>Yes</Button>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LOGOUT</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woah!, You Sure about <span className='text-danger font-weight-bold'>Logging Out ?</span></Modal.Body>
                <Modal.Footer>
                    <Link to={"/"} className='me-3'>
                        <Button variant="primary" className='px-4 py-1'>No</Button>
                    </Link>
                    <Button variant="primary" className='px-4 py-1' onClick={userLogOut}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Logout
