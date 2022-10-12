import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import StudentFilter from '../components/StudentFilter';
import StudentAlertBox from '../components/StudentAlertBox';

export default function Home() {
  const router = useRouter()
  
  //This returns the professor entire object
  const [professor, setProfessor] = useState({})
  //This is the professor courses. Is an array, that contains class id as strings.
  const [courses, setCourses] = useState([])
  // A professor's students { courseName: [students...] ... }
  const [students, setStudents] = useState([])

	const options = {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	}

  // Grabs all necessary data on first render
  useEffect( () => {

    if (localStorage.getItem('user_sl2') === null){
      router.replace('/login')
    }
    
    const endpoint = `http://localhost:8000/professors/uid/${localStorage.getItem("user_sl2")}`

    
    fetch(endpoint, options)
    .then(res => res.json())
    .then( data => {
      setCourses(data.courses)
      setProfessor(data)
    })

  }, [])

  useEffect( () => {
	for(let i = 0; i < courses.length; i++) {
		console.log(courses[i])
		fetch(`http://localhost:8000/students/classid/${courses[i]}`, options)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setStudents(students => [...students, ...data])
			//setStudents([data].concat(students))
			//setStudents(data.forEach(s => students.add(s)))
		})
  	}
  }, [courses])

  console.log(students)

//  const getStudents = async (courses) => {
//	for(let i = 0; i < courses.length; i++) {
//		await
//			fetch(`http://localhost:8000/students/classid/${courses[i]}`, options)
//			.then(res => res.json())
//			.then(data => {
//				console.log(data)
//				setStudents(data => [...students, ...data])
//			})
//  	}
//  }
//	//getStudents(courses)

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
          <h1>{element}</h1>
        ))
      }
      <StudentFilter/>
	  <StudentAlertBox students={students}/>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
