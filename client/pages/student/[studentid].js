import Navbar from "../../components/Navbar";
import PinnedStudents from '../../components/PinnedStudents';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import styles from "../../styles/Students.module.css"
import StudentLoginHistory from "../../components/StudentLoginHistory"
import Head from 'next/head'
import StudentLineChart from "../../components/StudentLineChart";


export default function StudentPage(){
    const router = useRouter()

    const { studentid } = router.query

    const [student, setStudent] = useState({})
    const [graphData, setGraphData] = useState({})

    useEffect(() => {
		if (localStorage.getItem("user_sl2")) {
            const endpoint = `${process.env.NEXT_PUBLIC_API_ROUTE}/students/id/${studentid}`
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
                setGraphData(transformData(data.logs))
            });
        }
        else{
			router.replace("/login");
        }
    }, [studentid])
    
    const transformData  = (data) => {
        let newData = {}
        for (const entry of data){
            let date = new Date(entry.datetime)
            if (date.toLocaleDateString() in newData){
                if (entry.result === "success"){
                    newData[date.toLocaleDateString()].success += 1
                }
                else{
                    newData[date.toLocaleDateString()].failure += 1
                }
            }
            else{
                let tempSuccess = 0;
                let tempFailure = 0;
                if (entry.result === "success"){
                    tempSuccess += 1
                }
                else{
                    tempFailure += 1
                }
                newData[date.toLocaleDateString()] = {
                    success: tempSuccess,
                    failure: tempFailure
                }
            }
        }
        return newData
    }

    console.log(graphData)

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
                        <StudentLineChart logsList={graphData}/>
                    </div>
              
                    <div className={styles.loginhistory}>
                        <StudentLoginHistory studentid={studentid}/>
                    </div>
                </div>
            </div>
    )
}