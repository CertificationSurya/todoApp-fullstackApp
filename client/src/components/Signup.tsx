import { useState, useRef, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreateUserMutation } from '../app/services/authAPI';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/Users/users';

// Toaster
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/ReactToastify.css'

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
            const { message, token, email } = result.data
            console.log(message)
            
            dispatch(setCredentials({ email, token }))
        }

    }, [result])


    return (
        <Form className='container | center-element' onSubmit={handleSubmit} style={{ width: "min(100%, 600px)" }}>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Signup
