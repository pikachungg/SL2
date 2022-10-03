import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import StudentFilter from '../components/StudentFilter';
import PinnedStudents from '../components/PinnedStudents';

export default function Home() {
  // const router = useRouter()
  
  //This returns the professor entire object
  const [professor, setProfessor] = useState({})
  //This is the professor courses. Is an array, that contains class id as strings.
  const [courses, setCourses] = useState([])



  useEffect( () => {

    if (localStorage.getItem('user_sl2') === null){
      router.replace('/login')
    }
    
    const endpoint = `http://localhost:8000/professors/uid/${localStorage.getItem("user_sl2")}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    
    fetch(endpoint, options)
    .then(res => res.json())
    .then( data => {
      setCourses(data.courses)
      setProfessor(data)
    })

  }, [])

  console.log(professor)

  const logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    router.replace('/login')
  }
  
  return (
    <div className={styles.container}>
      <Navbar/>
      {/* <p>This is dashboard page</p> */}
      <p>This is dashboard page</p>
      {
        //This is an exmaple here, feel free to delete 49 to 53
      }
      <h2>Welcome back {professor.first_name} {professor.last_name}</h2>
      <h3>Your email is {professor.email}</h3>
      {
        courses.map( element => (
          <h1 key={element}>{element}</h1>
        ))
      }
      <StudentFilter/>
      <PinnedStudents/>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
