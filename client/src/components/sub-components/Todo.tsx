import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Todo = () => {
    const todo = { id: "kdalasd", title: "dd", description: "sddd dfasd dsfa das tring", completed: false }

    return (
        <Card className='todoItem'>
            <Card.Header>TODO #{todo.id}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {todo.description}
                    </p>
                    <footer className="blockquote-footer">
                        <cite title="Source Title">{todo.title}</cite>
                    </footer>
                    <footer className='blockquote-footer'>
                        <cite title="Source Title">Completed: {todo.completed+''}</cite>
                    </footer>

                </blockquote>
                <Button className='mt-4'>Toggle Completed</Button>

                <div className="btns | d-flex justify-content-between mt-5">
                    <Link to={'/'}>
                        <Button>Go To Home</Button>
                    </Link>
                    <Button>Save Changes</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Todo
