import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGetAllTodosQuery } from '../services/todoAPI';
import Loader from './Loader/Loader';

// redux action
import { todoAction } from "../features/Todos/todos"


const Todos = () => {
  const { todos } = useAppSelector(state => state.todo)
  const { setTodos } = todoAction
  const dispatch = useAppDispatch();

  // fetching data fron query 
  const { data: todoList, error, isLoading } = useGetAllTodosQuery()
  
  useEffect(() => {
    if (todoList) {
      dispatch(setTodos(todoList))
    }
    if (error) console.log(error)
  }, [todoList, error])

  return (
    <>
      <div className='container | mt-5'>
        {isLoading ? <Loader type='cylon' color="#09ffa1" /> :
          (
            todos.map(todo => (
              <Card key={todo.id} className='my-2'>
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
          )
        }
      </div>
    </>
  )
}

export default Todos
