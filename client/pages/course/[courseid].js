import { useRouter } from 'next/router'
import StudentFilter from "../../components/StudentFilter";
import PinnedStudents from '../../components/PinnedStudents';
import Navbar from "../../components/Navbar";
import StudentAlertBox from '../../components/StudentAlertBox';
import styles from "../../styles/Courses.module.css"
import { useEffect } from 'react';

export default function CoursePage(){

    const router = useRouter()
    const { courseid } = router.query

    useEffect(() => {
		if (localStorage.getItem("user_sl2")) {
        }
        else{
			router.replace("/login");
        }
    }, [])
    
    return (
        <div className={styles.container}>
			<Navbar />
			<div className={styles.courseanalytics}>
				<div className={styles.chart}>
					<div className={styles.courseheader}>
						<button className={styles.backbutton}>Back to Dashboard</button>
						<img
							src="../images/courselogo.png"
							alt="Course Analytics Logo"
							className={styles.courseLogo}
						/>
						<h1>Selected Course Analytics: {courseid}</h1>
					</div>
                    <hr></hr>
					<div className={styles.chartcontainer}>
						<img src="../images/scr1.jpg"></img>
						<h3>* This is an image for display purposes until completed development, pending approval at MVP Beta Gate Review.</h3>
					</div>
				</div>
           
                <div className={styles.studenttable}>
                    
                    <StudentFilter courseid={courseid}/>
                </div>
				<div className={styles.alerts}>
					{/* this is for alert box */}
          			<StudentAlertBox/>
				</div>
				<div className={styles.pinned}>
					<PinnedStudents />
				</div>
			</div>
		</div>
    )
}