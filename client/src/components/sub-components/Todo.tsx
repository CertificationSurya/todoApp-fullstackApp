import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { RequiredTodoType, useGetSingleTodoQuery, useUpdateSingleTodoMutation } from '../../app/services/todoAPI'

// Loader and Toaster
import Loader from '../Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const Todo = () => {
    const { id } = useParams();
    const [singleTodo, setSingleTodo] = useState({} as RequiredTodoType)
    // const navigate = useNavigate()

    // Get Data of single TODO
    const { data: todo, error, isLoading } = useGetSingleTodoQuery(id, {refetchOnMountOrArgChange: true})
    // update single Todo
    const [updatePost, result] = useUpdateSingleTodoMutation()

    const toggleTodo = () => {
        setSingleTodo((singleTodo: RequiredTodoType) => ({ ...singleTodo, completed: !singleTodo.completed }))
    }

    const saveToDB = () => {
        // sent updated data
        updatePost({ ...singleTodo, updatedAt: new Date().toLocaleString() })
    }

    // save response to state
    useEffect(() => {
        if (todo) setSingleTodo(todo)
        if (error) toast.error(error.data.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, [todo, error])

    // useEffect(() => {
        // refetch()
        // console.log(isLoading)
        // if (!result.isUninitialized && !result.isError) {
        //     navigate("/")
        // }
    // }, [result])

    return (
        <>{todo ?
            <Card className='todoItem | center-element'>
                <Card.Header>TODO #{singleTodo.id}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {singleTodo.title}
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{singleTodo.description}</cite>
                        </footer>
                        <footer className='blockquote-footer'>
                            <cite title="Source Title">Completed: {singleTodo.completed + ''}</cite>
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
            :
            <div>

                <ToastContainer
                    position="bottom-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        }
            {isLoading && <Loader type="bars" color='yellow' />}
        </>
    )
}

export default Todo
