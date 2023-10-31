import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button, Alert } from "react-bootstrap"


import NavBar from "./components/Navbar"
import Todos from "./components/Todos"
import './App.css'
import { useAppSelector } from "./app/hooks"
import Login from "./components/Login"
import CreateTodo from "./components/CreateTodo"

const App = () => {
  const { isLoggedIn } = useAppSelector(state => state.todo)

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/"
          element={isLoggedIn ?
            <Todos />
            :
            <div className="center-element d-flex flex-column align-items-center border-1">
              <Alert key={"danger"} variant={"primary"} className="border-0 rounded-3">
                Opps! You aren't logged in
              </Alert>
              <Link to={"/login"} className="px-4 py-2 bg-primary text-white text-decoration-none rounded-3" > Go to Login </Link></div>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateTodo />} />

      </Routes>

    </Router>
  )
}

export default App
