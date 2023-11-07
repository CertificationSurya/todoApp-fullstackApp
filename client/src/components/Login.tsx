import { useRef, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useLoginUserMutation } from '../app/services/authAPI';

// form data type
type formDataType = {
    email: string,
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState({} as formDataType)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)

    // RTK-query
    const [loginUser, result] = useLoginUserMutation()

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

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await loginUser(formData)
    }

    if (!result.isUninitialized && result.isSuccess){
        console.log("Boopoti Bapitti Boom!")
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
    );
}

export default Login
