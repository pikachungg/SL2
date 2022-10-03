import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import StudentFilter from '../components/StudentFilter';

export default function Home() {
  const router = useRouter()
  
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
      <div className={styles.dashboard}>
        <div className={styles.sectionlist}>
            <div className={styles.dashheader}>
              <img src="./images/dashlogo.png" alt="Dashboard Logo" className={styles.dashLogo}/>
              <h1>Your Dashboard</h1>
            </div>
            <div className={styles.sectionselect}>
            <hr></hr>
              
            <h2>Logged in as {professor.first_name} {professor.last_name} with e-mail {professor.email} | Select Course Section to View Login Analytics:</h2>
                {
                  courses.map( element => (
                    <div className={styles.courselist}>{element}</div>
                  ))
                }
              <StudentFilter/>
            </div>
            <button onClick={logout}>Log out</button>
        </div>
        <div className={styles.chart}>{/* this is for the optional digest chart area*/}</div>
        <div className={styles.alerts}>{/* this is for alert box */}</div>
        <div className={styles.pinned}>{/* this is for pinned students box*/}</div>
      </div>
    </div>
  )
}
