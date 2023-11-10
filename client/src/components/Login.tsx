import { useRef, useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../app/services/authAPI';

// Toaster and loader

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Loader from './Loader/Loader';
import { useAppDispatch } from '../app/hooks';
import { setUserData } from '../features/Users/users';

// form data type
type formDataType = {
    email: string,
    password: string
}

const INITIAL_FORM_DATA = { email: '', password: ''}

const Login = () => {
    const [formData, setFormData] = useState <formDataType>(INITIAL_FORM_DATA)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    // RTK-query
    const [loginUser, result] = useLoginUserMutation()
    const dispatch = useAppDispatch()

    // utility function
    const handleClientErrorAndClear = (toastMsg: string) => {
        setFormData(INITIAL_FORM_DATA)
        return toast.error(toastMsg)
    }

    const handleShowPassword = () => {
        if (passwordRef.current) {
            switch (passwordRef.current.type) {
                case "password":
                    passwordRef.current.type = "text"
                    setShowPassword(true)
                    break;
                case "text":
                    passwordRef.current.type = "password"
                    setShowPassword(false)
                    break;
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password } = formData
        // client side validation
        if (password.length < 8) return handleClientErrorAndClear("Password must be atleast 8 characters")
        await loginUser(formData)
    }

    useEffect(() => {
        // adding authToken to store
        if (!result.isUninitialized && result.isSuccess && !result.isLoading) {
            // console.log(result)
            toast.success(result.data.message)
            dispatch(setUserData(true))
            navigate('/')
        }
        else if (!result.isUninitialized && result.isError) {
            toast.error(result.error.data.message)
        }
    }, [result])

    if (!result.isUninitialized && result.isLoading) return <Loader type='bars' color='blue' />

    return (
        <>
            <Form className='container | center-element' onSubmit={handleSubmit} style={{ width: "min(100%, 600px)" }}>
                <h3 className='text-center mb-4 text-decoration-underline fw-bold'>Login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="position-sideways">
                        <Form.Control ref={passwordRef} type="password" required placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        {
                            showPassword ?
                                <i className="fa-solid fa-eye-slash pointer" onClick={handleShowPassword} style={{ color: "#00aaff" }}></i>
                                :
                                <i className="fa-solid fa-eye pointer" onClick={handleShowPassword} style={{ color: "#0a89ff" }}></i>

                        }
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <Button variant="primary" type="submit" className='me-4'>
                    Submit
                </Button>
                <Link to={"/signup"}>
                    <Button variant="primary" type="submit">
                        No Account? go to SignUp
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
    );
}

export default Login
