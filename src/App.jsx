import { useState, useEffect } from 'react'
import db from './utils/db';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './App.css'

const App = () => {

  const navigate = useNavigate();

  // create state variable
  const [classsList, setClasslist] = useState([]);

  //create a function to fetch the data from firestore
  const fetchClasslist = async () => {
    const q = query(collection(db, "classlist"), orderBy('lastName', 'asc'))
    const docSnapshot = await getDocs(q);
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setClasslist(data);
  }

  const goToAdd = () => {
    navigate('/add');
  }

  //when the page loads, this will run once
  useEffect(() => {
    fetchClasslist();
  }, []);

  return (
    <>
      <h1>MTM6404 Classlist</h1>
      <button onClick={goToAdd}>Add Student</button>
      <ul>
        {classsList.map((student) => (
          <li key={student.id}>
            <Link to={`/student/${student.id}`}>
              {`${student.firstName} ${student.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
