import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import Student from "../routes/Student.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/student/:id',
        element: <Student />
    }
]);

export default router;
