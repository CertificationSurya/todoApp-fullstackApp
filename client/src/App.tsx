import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import './App.css'
import { useEffect } from "react"

// Components
import NavBar from "./components/Navbar"
import Todos from "./components/Todos"
import Login from "./components/Login"
import CreateTodo from "./components/CreateTodo"
import Todo from "./components/sub-components/Todo"
import Signup from "./components/Signup"
import Logout from "./components/Logout"
import NotLoggedIn from "./components/sub-components/NotLoggedIn"
import { useGetUserQuery } from "./app/services/authAPI"
import { setUserData } from "./features/Users/users"


const App = () => {
  const { isLoggedIn } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { data, error, isLoading } = useGetUserQuery()

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setUserData(true))
    }
  },[data, error])


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/"
          element={(isLoading || isLoggedIn) ?
            <Todos />
            :
            <NotLoggedIn errorMsg={error?.data.message}/>
          } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/todo/:id" element={<Todo />} />
        <Route path="/logout" element={<Logout />} />
       
      </Routes>
    </Router>
  )
}

export default App
