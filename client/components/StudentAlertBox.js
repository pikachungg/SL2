import styles from '../styles/StudentFilter.module.css'
import { useEffect, useState } from "react"

import { RiErrorWarningFill } from 'react-icons/ri'
import { IconContext } from "react-icons";

export default function StudentAlertBox(){

    let classid = "ISTE 140-1" //This should be dynamic, hardcoded rn for testing purposes

    const [studentList, setStudentList] = useState([])

    useEffect(() => {
        const endpoint = `http://localhost:8000/students/classid/${classid}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        fetch(endpoint, options)
        .then( res => res.json())
        .then( data => {
            console.log(data)
            setStudentList(data)
        })

    }, [])
	

	const calculateFailedLogins = (logs) => {
	    let count = 0
	    for (let i = 0; i < logs.length; i++){
	        if (logs[i].result == "Failure" || logs[i].result == "failure") 
	        count += 1
	    }
	
		let logins = count == 1 ? "login" : "logins"
	
		// Current get date
		// Find all logs within 7 day range, calculate count from this
		// store the most recent failure
		// interpolate into return string / tag
	
		return (<p>{count} failed {logins}</p>)
	}

    const getLastLogin = (logs) => {

    }
    
    return (
        <div className={styles.container}>
            <div className={styles.insideContainer}>
                <div>
					<IconContext.Provider value={{ color: 'orange' }}><RiErrorWarningFill/></IconContext.Provider> 
                    <h3>STUDENT ALERTS</h3>
                </div>
            	<table className={styles.table}>
					<tbody className={styles.tablebody}>
						{
							studentList.map( student => (
								<tr className={styles.tablerows}>
									<td>
										<h4>{student.first_name} {student.last_name}: {student.courses[0]}</h4>
										<p>{calculateFailedLogins(student.logs)}</p>
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
