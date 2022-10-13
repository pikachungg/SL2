import styles from "../styles/PinnedStudents.module.css";
import StudentPinCard from "./StudentPinCard";
import { MdGroupAdd, MdRemoveCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

export default function PinnedStudents() {
	const [pinnedStudents, setPinnedStudents] = useState([]);
	const [update, setUpdate] = useState(true);

	useEffect(() => {

		if (localStorage.getItem("user_sl2")){
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
				.then(res => res.json())
				.then((data) => {
					let pinnedStudents = data.pinned;
					setPinnedStudents(pinnedStudents);
				});
		}
	}, [update]);

	const removePin = (suid) => {
		const endpoint = `http://localhost:8000/professors/pinned?puid=${localStorage.getItem(
			"user_sl2",
		)}&suid=${suid}`;
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};

		fetch(endpoint, options)
			.then((res) => res.json())
			.then((data) => {
				setUpdate(!update);
			});
	};

    const pinnedStudentsTable = 
            <table className={styles.table}>
				<tbody>
					{pinnedStudents.map((student) => (
						<tr className={styles.tablerow} key={student}>
							<StudentPinCard uid={student} />
							<td>
								<IconContext.Provider
									value={{ color: "#FF6F00", size: "20px" }}
								>
									<MdRemoveCircle
										className={styles.deleteicon}
										onClick={() => removePin(student)}
									/>
								</IconContext.Provider>
							</td>
						</tr>
					))}
				</tbody>
			</table>

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<IconContext.Provider
					value={{ color: "#FF6F00", size: "20px" }}
				>
					<MdGroupAdd />
				</IconContext.Provider>
				<h4 className={styles.titletext}>PINNED STUDENTS</h4>
			</div>
			{pinnedStudents.length > 0 ? pinnedStudentsTable : <p>No students pinned</p>}
		</div>
	);
}
