import styles from "../styles/PinnedStudents.module.css";
import StudentPinCard from "./StudentPinCard";
import { MdGroupAdd, MdRemoveCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function PinnedStudents(props) {
	const [update, setUpdate] = useState(true);

	if (props.pinnedStudents === undefined) return <p>Loading</p>

	const removePin = (suid) => {
		console.log(suid)
		const endpoint = `${process.env.NEXT_PUBLIC_API_ROUTE}/professors/pinned?puid=${localStorage.getItem(
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
		props.removed(suid)
	};

    const pinnedStudentsTable = 
            <table className={styles.table}>
				<tbody>
					{props.pinnedStudents.map((student) => (
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
			{props.pinnedStudents.length > 0 ? pinnedStudentsTable : <p>No students pinned</p>}
		</div>
	);
}
