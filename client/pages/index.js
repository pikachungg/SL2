import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import PinnedStudents from "../components/PinnedStudents";
import StudentAlertBox from '../components/StudentAlertBox';
import Head from 'next/head'
import { SiHomeassistant } from "react-icons/si";
import { IconContext } from "react-icons";
import BarChart from "../components/BarChart";

export default function Home() {
	const router = useRouter();

	//This returns the professor entire object
	const [professor, setProfessor] = useState({});
	//This is the professor courses. Is an array, that contains class id as strings.
	const [courses, setCourses] = useState([]);
    const [pinnedStudents, setPinnedStudents] = useState([])

	useEffect(() => {
		if (localStorage.getItem("user_sl2")) {
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
					setCourses(data.courses);
					setProfessor(data);
					setPinnedStudents(data.pinned);
				});
		}
		else{
			router.replace("/login");
		}
	}, []);

	const redirectCourse = (course) => {
		router.push(`http://localhost:3000/course/${course}`)
	}

	function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

	const removedHappened = (studentid) => {
		setPinnedStudents(arrayRemove(pinnedStudents, studentid))
	}

	const data = [
		{year: 1980, efficiency: 24.3, sales: 8949000},
		{year: 1985, efficiency: 27.6, sales: 10979000},
		{year: 1990, efficiency: 28, sales: 9303000},
		{year: 1991, efficiency: 28.4, sales: 8185000},
		{year: 1992, efficiency: 27.9, sales: 8213000},
		{year: 1993, efficiency: 28.4, sales: 8518000},
		{year: 1994, efficiency: 28.3, sales: 8991000},
		{year: 1995, efficiency: 28.6, sales: 8620000},
		{year: 1996, efficiency: 28.5, sales: 8479000},
		{year: 1997, efficiency: 28.7, sales: 8217000},
		{year: 1998, efficiency: 28.8, sales: 8085000},
		{year: 1999, efficiency: 28.3, sales: 8638000},
		{year: 2000, efficiency: 28.5, sales: 8778000},
		{year: 2001, efficiency: 28.8, sales: 8352000},
		{year: 2002, efficiency: 29, sales: 8042000},
		{year: 2003, efficiency: 29.5, sales: 7556000},
		{year: 2004, efficiency: 29.5, sales: 7483000},
		{year: 2005, efficiency: 30.3, sales: 7660000},
		{year: 2006, efficiency: 30.1, sales: 7762000},
		{year: 2007, efficiency: 31.2, sales: 7562000},
		{year: 2008, efficiency: 31.5, sales: 6769000},
		{year: 2009, efficiency: 32.9, sales: 5402000},
		{year: 2010, efficiency: 33.9, sales: 5636000},
		{year: 2011, efficiency: 33.1, sales: 6093000},
		{year: 2012, efficiency: 35.3, sales: 7245000},
		{year: 2013, efficiency: 36.4, sales: 7586000},
		{year: 2014, efficiency: 36.5, sales: 7708000},
		{year: 2015, efficiency: 37.2, sales: 7517000},
		{year: 2016, efficiency: 37.7, sales: 6873000},
		{year: 2017, efficiency: 39.4, sales: 6081000},
	  ]

	return (
		<div className={styles.container}>
			<Head>
				<title>SL2 | Home</title>
			</Head>
			<Navbar />
			<div className={styles.dashboard}>
				<div className={styles.sectionlist}>
					<div className={styles.dashheader}>
						<IconContext.Provider
							value={{ color: "#FF6F00", size: "30px" }}>
							<SiHomeassistant />
						</IconContext.Provider>
						<h1>Your Dashboard</h1>
					</div>
					<div className={styles.sectionselect}>
						<hr></hr>

						<h2>
							Welcome back {professor.first_name}{" "}
							{professor.last_name}, you're logged in with {professor.email}{" "}
							| <b>Select Course Section to View Analytics:</b>
						</h2>
	
						{courses.map((element) => (
							<button className={styles.courselist} onClick={ () => redirectCourse(element) }>{element}</button>
						))}
					</div>
					
				</div>

				<div className={styles.alerts}>
					{/* this is for alert box */}
          			<StudentAlertBox/>
				</div>
				<div className={styles.pinned}>
					<PinnedStudents pinnedStudents={pinnedStudents} removed={removedHappened}/>
				</div>
			</div>

			<BarChart />
			
		</div>
	);
}
