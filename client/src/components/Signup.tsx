import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreateUserMutation } from '../app/services/authAPI';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/Users/users';

// Toaster
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Loader from './Loader/Loader';

// form data type
export type formDataType = {
    email: string,
    password: string
    confirmPassword?: string
}

const Signup = () => {
    const [formData, setFormData] = useState({} as formDataType)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // create user
    const [createUser, result] = useCreateUserMutation()

    const handleShowPassword = () => {
        if (passwordRef.current && confirmPasswordRef.current) {
            switch (passwordRef.current.type) {
                case "password":
                    passwordRef.current.type = "text"
                    confirmPasswordRef.current.type = "text"
                    setShowPassword(true)
                    break;
                case "text":
                    confirmPasswordRef.current.type = "password"
                    passwordRef.current.type = "password"
                    setShowPassword(false)
                    break;
            }
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createUser(formData)
    }

    useEffect(() => {
        // adding authToken to store
        if (!result.isUninitialized && result.isSuccess && !result.isLoading) {
            const { message, id, email } = result.data
            toast.success(message + "\n Navigating to login page")
            dispatch(setCredentials({ email, id }))

            setTimeout(() => {
                navigate("/login")
            }, 2500)
        }
        else if (!result.isUninitialized && result.isError) {
            // console.log(result)
            toast.error(result.error.data.message)
        }
    }, [result])

    if (!result.isUninitialized && result.isLoading) return <Loader type='bars' color='blue' />

    return (
        <>
            <Form className='container | center-element' onSubmit={handleSubmit} style={{ width: "min(100%, 600px)" }}>
                <h3 className='text-center mb-4 text-decoration-underline fw-bold'>SignUp</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="position-sideways">
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        {
                            showPassword ?
                                <i className="fa-solid fa-eye-slash pointer" onClick={handleShowPassword} style={{ color: "#00aaff" }}></i>
                                :
                                <i className="fa-solid fa-eye pointer" onClick={handleShowPassword} style={{ color: "#0a89ff" }}></i>

                        }
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="position-sideways">
                        <Form.Control ref={confirmPasswordRef} type="password" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                        {
                            showPassword ?
                                <i className="fa-solid fa-eye-slash pointer" onClick={handleShowPassword} style={{ color: "#00aaff" }}></i>
                                :
                                <i className="fa-solid fa-eye pointer" onClick={handleShowPassword} style={{ color: "#0a89ff" }}></i>

                        }
                    </div>
                </Form.Group>
                
                <Button variant="primary" type="submit" className='me-4'>
                    Submit
                </Button>
                <Link to={"/login"}>
                    <Button variant="primary" type="submit">
                        Had Account? go to Login
                    </Button>
                </Link>
            </Form>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Signup
