import styles from '../styles/StudentFilter.module.css'
import { useEffect, useState } from "react"

import { RiErrorWarningFill } from 'react-icons/ri'
import { IconContext } from "react-icons";

export default function StudentLoginHistory({student}){

	let sortedLogs = student.logs.sort(function(a, b) {
		return new Date(b.datetime) - new Date(a.datetime)
	})
    
    return (
        <div className={styles.container}>
            <div className={styles.insideContainer}>
                <div className={styles.insideContainerLeft}>
                    <h3>LOGIN HISTORY</h3>
					<h5>{student.first_name} {student.last_name} ({student.username})</h5>
                </div>
            </div>
            <table className={styles.table}>
                <thead className={styles.tableheader}>
                    <tr>
                        <th className={styles.tableheadercolumn}>FAILED LOGIN ATTEMPT DATE</th>
                        <th className={styles.tableheadercolumn}>FAILED LOGIN ATTEMPT TIME</th>
                    </tr>
                </thead>
                <tbody className={styles.tablebody}>
                    {
                        sortedLogs.map( log => (
                            <tr className={styles.tablerows}>
                                <td className={styles.tablecolumns}>{log.datetime.toDateString()}</td>
                                <td className={styles.tablecolumns}>{log.datetime.toLocaleTimeString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}
