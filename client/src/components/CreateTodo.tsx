import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// form data type
type formDataType = {
  title: string,
  description: string
}

const CreateTodo = () => {
  const [formData, setFormData] = useState({} as formDataType)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: axios to server with data

  }

  return (
    <Form className='center-element | container ' onSubmit={handleSubmit} style={{ width: "min(100%, 600px)" }}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='lead'>Title</Form.Label>
        <Form.Control type="text" placeholder="Your title here" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='lead'>Description about Your Todo</Form.Label>
        <Form.Control as="textarea" rows={5} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{resize: 'none'}}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default CreateTodo
