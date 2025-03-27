import { useState, useEffect } from "react";

export const EditForm = ({ student, onUpdate }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentNumber: ""
    });

    useEffect(() => {
        if(student) {
            setFormData({
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                studentNumber: student.studentNumber
            });
        }
    }, [student])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData)
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Student</h2>
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
            <button type="submit">Update Student</button>
        </form>
    )

}