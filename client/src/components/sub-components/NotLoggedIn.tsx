import { Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

type propType = {
    errorMsg: string
}
// Toaster
import { toast, ToastContainer } from 'react-toastify'

const NotLoggedIn = ({ errorMsg }: propType) => {

    toast.error(errorMsg, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

    return (
        <>
            <div className="center-element d-flex flex-column align-items-center border-1">
                <Alert key={"danger"} variant={"primary"} className="border-0 rounded-3">
                    Opps! You aren't logged in
                </Alert>
                <div className="d-flex">
                    <Link to={"/login"} className="px-4 py-2 me-4 bg-primary text-white text-decoration-none rounded-3" > Go to Login </Link>
                    <Link to={"/signup"} className="px-4 py-2 bg-primary text-white text-decoration-none rounded-3" > Go to Sign Up </Link>
                </div>
            </div>
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
        </>
    )
}

export default NotLoggedIn
