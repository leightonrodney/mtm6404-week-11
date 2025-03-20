import { useState, useEffect } from 'react'
import db from './utils/db';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import './App.css'

const App = () => {

  // create state variable
  const [classsList, setClasslist] = useState([]);

  //create a function to fetch the data from firestore
  const fetchClasslist = async () => {
    const docSnapshot = await getDocs(collection(db, "classlist"));
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setClasslist(data);
  }

  //when the page loads, this will run once
  useEffect(() => {
    fetchClasslist();
  }, []);

  return (
    <>
      <h1>MTM6404 Classlist</h1>
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
