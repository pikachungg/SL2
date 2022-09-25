import styles from '../styles/StudentFilter.module.css'
import { useEffect, useState } from "react"

export default function StudentFilter(){

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


    }, [])
    
    return (
        <div className={styles.container}>
            <div className={styles.insideContainer}>
                <div className={styles.insideContainerLeft}>
                    <p>STUDENTS IN THIS COURSE SECTION:</p>
                    <p>Select a student to view their login analytics</p>
                </div>
                <div className={styles.insideContainerRight}>
                    <p>This is search bar</p>
                </div>
            </div>
            <table className={styles.table}> 
                <thead>
                    <tr>PIN</tr>
                </thead>
            </table>
        </div>
    )

}