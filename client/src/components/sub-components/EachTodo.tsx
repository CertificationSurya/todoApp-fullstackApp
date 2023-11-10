import { Card, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { RequiredTodoType } from "../../app/services/todoAPI"

type propType = {
    todo: RequiredTodoType,
    handleDelete: (id:string) => Promise<void>
}

const EachTodo = ({todo, handleDelete} : propType) => {
    return (
        <Card key={todo.id} className='my-2 mx-4 px-3'>
            <Card.Body>
                <div className="titles" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Title onClick={() => handleDelete(todo.id)}><i className="fa-solid fa-trash | pointer" ></i></Card.Title>
                </div>
                <Card.Text>
                    {todo.description}
                </Card.Text>
                <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="primary">See Full</Button>
                </Link>
            </Card.Body>
        </Card>
        )
}

export default EachTodo
