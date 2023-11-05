// import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Alert } from "react-bootstrap"


import NavBar from "./components/Navbar"
import Todos from "./components/Todos"
import './App.css'
import { useAppSelector } from "./app/hooks"
import Login from "./components/Login"
import CreateTodo from "./components/CreateTodo"
import Todo from "./components/sub-components/Todo"
import Signup from "./components/Signup"
import Logout from "./components/Logout"

const App = () => {
  const { isLoggedIn } = useAppSelector(state => state.user)

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/"
          element={isLoggedIn ?
            <Todos />
            :
            <div className="center-element d-flex flex-column align-items-center border-1">
              <Alert key={"danger"} variant={"primary"} className="border-0 rounded-3">
                Opps! You aren't logged in
              </Alert>
              <div className="d-flex">
                <Link to={"/login"} className="px-4 py-2 me-4 bg-primary text-white text-decoration-none rounded-3" > Go to Login </Link>
                <Link to={"/signup"} className="px-4 py-2 bg-primary text-white text-decoration-none rounded-3" > Go to Sign Up </Link>
              </div>
            </div>
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
