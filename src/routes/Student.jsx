import { useState, useEffect } from "react";
import db from '../utils/db';
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export const Student = () => {

    // set up state variable for student
    const [student, setStudent] = useState({});

    // id from the route params
    const { id } = useParams();

    // create a function to fetch student
    const fetchStudentById = async (studentId) => {
        const docRef = doc(db, "classlist", studentId);
        const docSnapshot = await getDoc(docRef);

        // check if the doc exists in firestore
        if (docSnapshot.exists()) {
            setStudent({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });
        } else {
            alert('Student does not exist in our records! Please provide a valid student id');
            return null;
        }
    }

    useEffect(() => {
        fetchStudentById(id);
    }, [id]);

    return (
        <div className="student">
            {student && (
            <div>
                <h1>{student?.firstName} {student?.lastName}</h1>
                <p>Student Number: {student.studentNumber}</p>
                <p>Email: {student?.email}</p>
            </div>
            )}
        </div>
    );
}

export default Student;