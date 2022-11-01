import styles from '../styles/StudentFilter.module.css'
import { useEffect, useState } from "react"

import { RiErrorWarningFill } from 'react-icons/ri'
import { IconContext } from "react-icons";
import Link from 'next/link';

export default function StudentFilter(props){ //Add props to data.

    const [studentList, setStudentList] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    
    useEffect( () => {
        setStudentList(props.studentList)
        setFilteredStudents(props.studentList)
    }, [props.studentList])

    if (!props.courseid) return 'loading'

    const calculateFailedLogins = (logs) => {
        let count = 0
        for (let i = 0; i < logs.length; i++){
            if (logs[i].result == "Failure") 
            count += 1
        }
        return (<p>{count} {count > 5 ? <IconContext.Provider value={{ color: 'red'}}><RiErrorWarningFill/></IconContext.Provider> : null}</p>)
    }

    const getLastLogin = (logs) => {
        let successes = []
        for (let i = 0; i < logs.length; i++){
            if (logs[i].result == "Failure")
            successes.push(logs[i])
        }
        if (successes.length > 0){
            //Change this for different datetime format
            let date = new Date(successes.slice(-1)[0].datetime)
            return <p>{date.toDateString()}, {date.toLocaleTimeString("en-US")}</p>
        }
        else{
            return <p>No Failed Logins</p>
        }
    }

    const filtering = (e) => {
        e.preventDefault()
        let filterValue = e.target.value
        const newFilter = studentList.filter( (employee) => {
            //Change this to change filter
            return employee.email.includes(filterValue)
        })
        setFilteredStudents(newFilter)
    }

    const determinePinned = (studentid) => {
        return props.pinnedStudents.includes(studentid)
    }

    const pinStudent = (studentid) => {
        if (props.pinnedStudents.includes(studentid)){
            const endpoint = `http://localhost:8000/professors/pinned?puid=${localStorage.getItem(
                "user_sl2",
            )}&suid=${studentid}`;
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(endpoint, options)
            props.removed(studentid)
        }
        else{
            props.update(studentid)
            const endpoint = `http://localhost:8000/professors/pinned?puid=${localStorage.getItem("user_sl2",)}&suid=${studentid}`;
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(endpoint, options)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.insideContainer}>
                <div className={styles.insideContainerLeft}>
                    <h3>STUDENTS IN THIS COURSE SECTION:</h3>
                    <p>Select a student to view their login analytics</p>
                </div>
                <div className={styles.insideContainerRight}>
                    <input onChange={filtering} placeholder="| Filter Students by RIT Username..." className={styles.filterInput}></input>
                </div>
            </div>
            <table className={styles.table}>
                <thead className={styles.tableheader}>
                    <tr>
                        <th className={styles.tableheaderpin}>PIN</th>
                        <th className={styles.tableheadercolumn}>FULL NAME</th>
                        <th className={styles.tableheadercolumn}>RIT USERNAME</th>
                        <th className={styles.tableheadercolumn}># FAILED LOGIN</th>
                        <th className={styles.tableheadercolumn}>LAST FAILED LOGIN DATE + TIME</th>
                    </tr>
                </thead>
                <tbody className={styles.tablebody}>
                    {
                        filteredStudents.map( student => (
                            <tr className={styles.tablerows} key={student.uid}>
                                <td className={styles.tablecolumnspin}><input type="checkbox" onChange={ () => pinStudent(student.username)} checked={determinePinned(student.username)}/></td>
                                <td className={styles.tablecolumns + " " + styles.link}><Link href={`/student/${student.username}`}><b>{student.first_name} {student.last_name}</b></Link></td>
                                <td className={styles.tablecolumns}>{student.email.split('@')[0]}</td>
                                <td className={styles.tablecolumns}>{calculateFailedLogins(student.logs)}</td>
                                <td className={styles.tablecolumns}>{getLastLogin(student.logs)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}
