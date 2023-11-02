import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';

const Todos = () => {
  const { todos } = useAppSelector(state => state.todo)

  return (
    <>
      {todos.map(todo => (
        <Card key={todo.id}>
          <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>
              {todo.description}
            </Card.Text>
            <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none' }}>
              <Button variant="primary">See Full</Button>
            </Link>
          </Card.Body>
        </Card>
      ))
      }
    </>
  )
}

export default Todos
