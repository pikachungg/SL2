import { useRouter } from 'next/router'
import StudentFilter from "../../components/StudentFilter";
import PinnedStudents from '../../components/PinnedStudents';
import Navbar from "../../components/Navbar";
import StudentAlertBox from '../../components/StudentAlertBox';
import styles from "../../styles/Courses.module.css"
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { HiChartSquareBar } from "react-icons/hi";
import { IconContext } from "react-icons";

export default function CoursePage(){

    const router = useRouter()
    const { courseid } = router.query
    const [pinnedStudents, setPinnedStudents] = useState([])

    useEffect(() => {
		if (courseid){
            const endpoint = `http://localhost:8000/professors/uid/${localStorage.getItem(
				"user_sl2",
			)}`;
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			};
	
			fetch(endpoint, options)
				.then( res => res.json())
				.then( data => {
					setPinnedStudents(data.pinned);
				});
        }
    }, [courseid])

	const refreshData = () => {
		router.replace(router.asPath);
	  }

	const updateHappened = (studentid) => {
		if (!pinnedStudents.includes(studentid)){
			setPinnedStudents([...pinnedStudents, studentid])
		}
		else{
			//Set error message
		}
	}

	function arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    
	const removedHappened = (studentid) => {
		setPinnedStudents(arrayRemove(pinnedStudents, studentid))
	}
    

    return (
        <div className={styles.container}>
			<Head>
				<title>SL2 | {`${courseid}`}</title>
			</Head>
			<Navbar />
			<div className={styles.courseanalytics}>
				<div className={styles.chart}>
					<div className={styles.courseheader}>
						<button className={styles.backbutton} onClick={() => router.back()}>Back</button>
						{/* <img
							src="../images/courselogo.png"
							alt="Course Analytics Logo"
							className={styles.courseLogo}
						/> */}
						<IconContext.Provider
							value={{ color: "#FF6F00", size: "40px" }}>
							<HiChartSquareBar />
						</IconContext.Provider>
						<h1>Selected Course Analytics: {courseid}</h1>
					</div>
                    <hr></hr>
					<div className={styles.chartcontainer}>
						<img src="../images/scr1.jpg"></img>
						<h3>* This is an image for display purposes until completed development, pending approval at MVP Beta Gate Review.</h3>
					</div>
				</div>
           
                <div className={styles.studenttable}>
                    <StudentFilter courseid={courseid} pinnedStudents={pinnedStudents} update={updateHappened} removed={removedHappened}/>
                </div>
				<div className={styles.alerts}>
					{/* this is for alert box */}
          			<StudentAlertBox/>
				</div>
				<div className={styles.pinned}>
					<PinnedStudents pinnedStudents={pinnedStudents} removed={removedHappened}/>
				</div>
			</div>
		</div>
    )
}