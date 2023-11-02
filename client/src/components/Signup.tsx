import { useState, useRef } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// form data type
type formDataType = {
    email: string,
    password: string
    confirmPassword: string
}

const Signup = () => {
    const [formData, setFormData] = useState({} as formDataType)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)

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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: axios to server with data

    }


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
