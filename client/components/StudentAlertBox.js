import styles from '../styles/StudentAlertBox.module.css'
import { useEffect, useState } from "react"

import { RiErrorWarningFill } from 'react-icons/ri'
import { IconContext } from "react-icons";

export default function StudentAlertBox(students){
    //const [studentList, setStudentList] = useState([])

	//const classid = "ISTE 140-1"

//	useEffect(() => {
//		const options = {
//		    method: 'GET',
//		    headers: {
//		        'Content-Type': 'application/json'
//		    },
//		}
//
//
//		console.log(courses)
//
//		for(let classid of courses.courses) {
//			let endpoint = `http://localhost:8000/students/classid/${classid}`
//			fetch(endpoint, options)
//			.then( res => res.json())
//			.then( data => {
//				console.log(data)
//				setStudentList(studentList => [...studentList, ...data])
//			})
//		}
//
//	}, [])

	const calculateFailedLogins = (logs) => {
		//console.log(logs)
		let count = 0
		let sortedLogs = logs.sort(function(a, b) {
			return new Date(b.datetime) - new Date(a.datetime)
		})
		
		let now = new Date() // current date
		let weekRange = now.setDate(now.getDate() - 7) // 7 day range
		
		for(let i = 0; i < sortedLogs.length; i++) {
			if(new Date(sortedLogs[i].datetime) < weekRange) {
				break
			}
		
			if (logs[i].result.toLowerCase() == "failure") {
				count += 1
			}
		}
		
		let mostRecent = new Date(sortedLogs[0].datetime) // most recent failure
		let logins = (count == 1 ? "login" : "logins")
		
		// interpolate into return string / tag
		return (
			<div className={styles.description}>
				<p>{count} failed {logins} in the past week</p>
				<p>Last Failed Login: {mostRecent.toDateString()}, {mostRecent.toLocaleTimeString("en-US")}</p>
			</div>
		)
	}

		const getLastLogin = (logs) => {

    }
    
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.title}>
					<IconContext.Provider value={{ color: 'orange', size: '25px'}}><RiErrorWarningFill/></IconContext.Provider> 
                    <h3>STUDENT ALERTS</h3>
                </div>
            	<table className={styles.table}>
					<tbody>
						{
							students.students.map( student => (
								<tr className={styles.tablerows}>
									<td>
										<h4>{student.first_name} {student.last_name}: {student.courses.toString()}</h4>
										{calculateFailedLogins(student.logs)}
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
            </div>
		</div>
    )
}
