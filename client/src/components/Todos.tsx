import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDeleteSingleTodoMutation, useGetAllTodosQuery } from '../app/services/todoAPI';
import Loader from './Loader/Loader';

// redux action
import { todoAction } from "../features/Todos/todos"


const Todos = () => {
  const { todos } = useAppSelector(state => state.todo)
  const { setTodos } = todoAction
  const dispatch = useAppDispatch();

  // fetching data fron query 
  // const { data: todoList, error, isLoading, refetch } = useGetAllTodosQuery(undefined, { refetchOnMountOrArgChange: true })
  const { data: todoList, error, isLoading, refetch } = useGetAllTodosQuery()
  // console.log(todoList, error)
  useEffect(() => {
    if (todoList) {
      dispatch(setTodos(todoList))
    }
    if (error) console.log(error)
  }, [todoList, error])

  // Delete a todo
  const [deleteTodo, result] = useDeleteSingleTodoMutation()

  const handleDelete = async(id: string) => {
    await deleteTodo(id)
    refetch()
  }

  // TODO: Modify / Remove
  // check if delete was success
  useEffect(() => {
    if (!result.isUninitialized && result.isSuccess) {
      console.log(result)
    }
  }, [result])

  return (
    <>
      <div className='container | mt-5'>
        {isLoading ? <Loader type='cylon' color="#09ffa1" /> :
          (
            todos.map(todo => (
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
            ))
          )
        }
      </div>
    </>
  )
}

export default Todos
