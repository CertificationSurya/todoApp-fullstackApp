import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState, useEffect } from 'react';
import { useDeleteSingleTodoMutation, useGetAllTodosQuery } from '../app/services/todoAPI';
import Loader from './Loader/Loader';
import { Card, Button } from 'react-bootstrap';

// redux action
import { todoAction } from "../features/Todos/todos"
import EachTodo from './sub-components/EachTodo';
import { Link } from 'react-router-dom';


const Todos = () => {
  const [loading, setLoading] = useState(true)
  const { todos } = useAppSelector(state => state.todo)
  const { setTodos } = todoAction
  const dispatch = useAppDispatch();

  // fetching data fron query 
  const { data: todoList, error, isLoading, refetch } = useGetAllTodosQuery()

  useEffect(() => {
    if (todoList && !isLoading ) {
      dispatch(setTodos(todoList))
      setLoading(false)
    }
    else if (isLoading) setLoading(true)
    // if (error) console.log(error)
  }, [todoList, error, isLoading])

  // Delete a todo
  const [deleteTodo] = useDeleteSingleTodoMutation()
  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteTodo(id)
    await refetch()
  }

  return loading ? <Loader type='bars' color='red' /> :
    (
      <>
        <div className='container | mt-5'>
          {todos.length < 1 ?
             <Card className='center-element' style={{ width: 'min( 300px, 100%)'}}>
             <Card.Header style={{background: "blue", color: 'white'}}>Topic</Card.Header>
             <Card.Body className="text-center" style={{background: '#e9faff'}}>
               <Card.Title className='text-danger'> No todo found! </Card.Title>
               <Link to={'create'}>
               <Button variant="primary">Create something new</Button>
               </Link>
             </Card.Body>
           </Card>
            :
            (
              todos.map(todo => (
                <EachTodo key={todo.id} todo={todo} handleDelete={handleDelete} />
              ))
            )
          }
        </div>
      </>
    )
}

export default Todos
