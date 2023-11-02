import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Todo = () => {
    const todo = { id: "kdalasd", title: "dd", description: "sddd dfasd dsfa das tring", completed: false }

    const toggleTodo = () =>{
        todo.completed = !todo.completed
    }

    const saveToDB = () =>{
        
    }

    return (
        <Card className='todoItem | center-element'>
            <Card.Header>TODO #{todo.id}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {todo.title}
                    </p>
                    <footer className="blockquote-footer">
                        <cite title="Source Title">{todo.description}</cite>
                    </footer>
                    <footer className='blockquote-footer'>
                        <cite title="Source Title">Completed: {todo.completed+''}</cite>
                    </footer>

                </blockquote>
                <Button className='mt-4' onClick={toggleTodo}>Toggle Completed</Button>

                <div className="btns | d-flex justify-content-between mt-5">
                    <Link to={'/'}>
                        <Button>Go To Home</Button>
                    </Link>
                    <Button onClick={saveToDB}>Save Changes</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Todo
