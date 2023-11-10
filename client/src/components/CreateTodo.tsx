import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreateSingleTodoMutation } from '../app/services/todoAPI';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';

// form data type
type formDataType = {
  id: string,
  title: string,
  description: string
  completed: boolean
}

const CreateTodo = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({} as formDataType)
  const [createTodo, result] = useCreateSingleTodoMutation()

  const currentLocalDateAndTime = (): string => {
    return new Date().toLocaleString()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ ...formData, createdAt: currentLocalDateAndTime(), updatedAt: currentLocalDateAndTime(), completed: false })
  }

  useEffect(() => {
    if (!result.isUninitialized && result.isLoading) setIsLoading(true)
    else if (!result.isUninitialized && !result.isLoading && !result.isError) {
      setIsLoading(false)
      navigate("/")
    }

  }, [result])

  return isLoading ?
    <Loader type='bars' color='red' />
    :
    (
      <>

        <Form className='center-element | container ' onSubmit={handleSubmit} style={{ width: "min(100%, 600px)" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='lead'>Title</Form.Label>
            <Form.Control type="text" placeholder="Your title here" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className='lead'>Description about Your Todo</Form.Label>
            <Form.Control as="textarea" rows={5} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ resize: 'none' }} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    )
}

export default CreateTodo
