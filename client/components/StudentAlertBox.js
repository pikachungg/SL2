import styles from "../styles/StudentAlertBox.module.css";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { RiErrorWarningFill } from "react-icons/ri";
import { IconContext } from "react-icons";

export default function StudentAlertBox() {
	const router = useRouter();
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([])
	const [failedLogins, setFailedLogins] = useState([])

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
				});
		}
		else{
			router.replace("/login");
		}
	}, []);

	useEffect(() => {
		let query = makeQueryString(courses)
		if (query !== "?"){
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			};
	
			fetch(
				`http://localhost:8000/students/courses/${query}`,
				options,
			)
				.then((res) => {
					if (res.status === 200){
						return res.json()
					}
				})
				.then((data) => {
					setStudents(data);
				});
		}
		
	}, [courses]);

	useEffect(() => {
		calculateFailedLogins(students)
	}, [students])

	console.log(failedLogins)

	const makeQueryString = (courses) => {
		let queryString = '?'
		for (let i = 0; i < courses.length; i++){
			if (i === courses.length - 1){
				queryString = queryString + `course=${courses[i]}`
			}
			else{
				queryString = queryString + `course=${courses[i]}&`
			}
		}
		return queryString
	}

	const OLDcalculateFailedLogins = (logs) => {
		let count = 0
		let sortedLogs = logs.sort(function (a, b) {
			return new Date(b.datetime) - new Date(a.datetime)
		});
		
		let now = new Date(); // current date
		let weekRange = now.setDate(now.getDate() - 7) // 7 day range

		for (let i = 0; i < sortedLogs.length; i++) {
			if (new Date(sortedLogs[i].datetime) < weekRange) {
				break;
			}

			if (sortedLogs[i].result.toLowerCase() === "failure") {
				count += 1;
			}
		}

		let mostRecent = new Date(sortedLogs[0].datetime); // most recent failure
		let logins = count == 1 ? "login" : "logins";

		// interpolate into return string / tag
		return (
			<div className={styles.description}>
				<h3>
					{count} failed {logins} in the past week
				</h3>
				<h4>
					Last Failed Login: {mostRecent.toDateString()},{" "}
					{mostRecent.toLocaleTimeString("en-US")}
				</h4>
			</div>
		);
	}

	const calculateFailedLogins = (students) => {

		let result = []

		for(let student of students) {
			if (student.logs.length > 0) {
				let count = 0
				let sortedLogs = student.logs.sort(function (a, b) {
					return new Date(b.datetime) - new Date(a.datetime)
				});
				let now = new Date(); // current date
				let weekRange = now.setDate(now.getDate() - 7) // 7 day range
	
				for (let i = 0; i < sortedLogs.length; i++) {
					if (new Date(sortedLogs[i].datetime) < weekRange) {
						break;
					}
	
					if (sortedLogs[i].result.toLowerCase() === "failure") {
						count += 1;
					}
				}
	
				let mostRecent = new Date(sortedLogs[0].datetime); // most recent failure
				let logins = count == 1 ? "login" : "logins";
	
				result.push({
					first_name: student.first_name,
					last_name: student.last_name,
					courses: student.courses,
					logins: logins,
					mostRecent: mostRecent,
					count: count
				})
			}
		
		}

		result = result.sort(function (a, b) {
			return b.count - a.count
		})
		setFailedLogins(result)
	}

	return (
		<div className={styles.container}>
			<div className={styles.insidecontainer}>
				<div className={styles.title}>
					<IconContext.Provider
						value={{ color: "#FF6F00", size: "20px" }}>
						<RiErrorWarningFill />
					</IconContext.Provider>
					<h3>STUDENT ALERTS</h3>
				</div>
				<table className={styles.table}>
					<tbody>
						{
							students !== undefined || students.length > 0 ?
							failedLogins.map( (student, index) => (
								<tr className={styles.tablerows} key={index}>
									<td>
										<h2 className={styles.tableHeader}>{student.first_name} {student.last_name}: {student.courses.toString()}</h2>
										<div className={styles.description}>
											<h3>
												{student.count} failed {student.logins} in the past week
											</h3>
											<h4>
												Last Failed Login Date + Time: <br></br>{student.mostRecent.toDateString()}, {" "}
												
												{student.mostRecent.toLocaleTimeString("en-US")}
											</h4>
										</div>
									</td>
								</tr>

							))
							: <tr><td><p>Loading</p></td></tr>
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}
