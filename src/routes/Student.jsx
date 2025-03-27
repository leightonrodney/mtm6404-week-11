import { useState, useEffect } from "react";
import db from '../utils/db';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../components/EditForm";

export const Student = () => {

    const navigate = useNavigate();

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

    //Update function
    const handleUpdate = async (updatedStudent) => {
        try {
            const docRef = doc(db, "classlist", id);
            await updateDoc(docRef, updatedStudent);
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    // Delete function
    const handleStudentDelete = async () => {
        const msg = "Are you sure you want to delete?";
        try {
            if(confirm(msg) == true) {
                const docRef = doc(db, "classlist", id);
                await deleteDoc(docRef);
                setStudent({})
                navigate('/');
            } else {
                navigate(0);
            }
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStudentById(id);
    }, [id]);

    const DeleteButton = () => {
        return (
            <button class="del-btn" onClick={handleStudentDelete}>Delete Student?</button>
        );
    }

    return (
        <div className="student">
            {student && (
                <>
                    <EditForm student={student} onUpdate={handleUpdate} />
                    <DeleteButton />
                </>
            )}
        </div>
    );
}

export default Student;