import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import PinnedStudents from "../components/PinnedStudents";
import StudentAlertBox from '../components/StudentAlertBox';
import Head from 'next/head'


export default function Home() {
	const router = useRouter();

	//This returns the professor entire object
	const [professor, setProfessor] = useState({});
	//This is the professor courses. Is an array, that contains class id as strings.
	const [courses, setCourses] = useState([]);

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
				});
		}
		else{
			router.replace("/login");
		}
	}, []);

	const redirectCourse = (course) => {
		router.push(`http://localhost:3000/course/${course}`)
	}

	const logout = (e) => {
		e.preventDefault();
		localStorage.clear();
		router.replace("/login");
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>SL2 | Home</title>
			</Head>
			<Navbar />
			<div className={styles.dashboard}>
				<div className={styles.sectionlist}>
					<div className={styles.dashheader}>
						<img
							src="./images/dashlogo.png"
							alt="Dashboard Logo"
							className={styles.dashLogo}
						/>
						<h1>Your Dashboard</h1>
					</div>
					<div className={styles.sectionselect}>
						<hr></hr>

						<h2>
							Welcome back {professor.first_name}{" "}
							{professor.last_name}
						</h2>
	
						{courses.map((element) => (
							<button className={styles.courselist} onClick={ () => redirectCourse(element) }>{element}</button>
						))}
					</div>
				</div>

				<div className={styles.chart}>
					{/* this is for the optional digest chart area*/}
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
	);
}
