import { useState } from "react";
import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Add = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentNumber: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const c = collection(db, "classlist");

        try {
            const student = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                studentNumber: formData.studentNumber
            })
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <div>
                <input type="text" name="firstName" placeholder="Please enter your First Name" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="lastName" placeholder="Please enter your Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
                <input type="email" name="email" placeholder="Please enter your Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="studentNumber" placeholder="Please enter your Student Number" value={formData.studentNumber} onChange={handleChange} />
            </div>
            <button type="submit">Add Student</button>
        </form>
    );
}

export default Add;