import Navbar from "../../components/Navbar";
import PinnedStudents from '../../components/PinnedStudents';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import styles from "../../styles/Students.module.css"
import StudentLoginHistory from "../../components/StudentLoginHistory"
import Head from 'next/head'


export default function StudentPage(){
    const router = useRouter()
    const { studentid } = router.query
    const [student, setStudent] = useState({})

    useEffect(() => {
		if (localStorage.getItem("user_sl2")) {
            const endpoint = `http://localhost:8000/students/id/${studentid}`
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			};
            fetch(endpoint, options)
            .then( res => res.json())
            .then( data => {
                setStudent(data)
            });
        }
        else{
			router.replace("/login");
        }
    }, [studentid])
    
    if (!studentid) return 'loading'
    return (
            <div className={styles.container}>
                <Head>
				    <title>SL2 | {`${studentid}`}</title>   
                </Head>
                <Navbar />
                <div className={styles.courseanalytics}>
                    <div className={styles.chart}>
                        <div className={styles.studentheader}>
						    <button className={styles.backbutton} onClick={() => router.back()}>Back</button>
                            <img
                                src="../images/courselogo.png"
                                alt="Course Analytics Logo"
                                className={styles.courseLogo}
                            />
                            <h1>Analytics for {student.first_name} {student.last_name} - {student.email}</h1>
                        </div>
                        <hr></hr>
                    </div>
              
                    <div className={styles.loginhistory}>
                        <StudentLoginHistory studentid={studentid}/>
                    </div>
                </div>
            </div>
    )
}