import styles from '../styles/StudentFilter.module.css'
import { useEffect, useState } from "react"

export default function StudentLoginHistory(props){
    const [student, setStudent] = useState({})
    const [sortedLogs, setSortedLogs] = useState([])

    useEffect(() => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_ROUTE}/students/id/${props.studentid}`;
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
                let sortinglogs = data.logs.sort(function(a, b) {
                    return new Date(b.datetime) - new Date(a.datetime)
                })
                setSortedLogs(sortinglogs)
            });

    }, [props.studentid])

        
    return (
        <div className={styles.containerhistory}>
            <div className={styles.insideContainer}>
                <div className={styles.insideContainerLeft}>
                    <h3>LOGIN HISTORY: </h3>
					{/*<h5>{student.first_name} {student.last_name} ({student.username})</h5> */}
                </div>
            </div>
            <table className={styles.tablehistory}>
                <thead className={styles.tableheader}>
                    <tr>
                        <th className={styles.tableheadercolumn}>FAILED LOGIN ATTEMPT DATE</th>
                        <th className={styles.tableheadercolumn}>FAILED LOGIN ATTEMPT TIME</th>
                    </tr>
                </thead>
                <tbody className={styles.tablebody}>
                    {
                        sortedLogs.length > 0 ? 
                        sortedLogs.map( (log, index) => (
                            <tr className={styles.tablerows} key={index}>
                                <td className={styles.tablecolumns}>{new Date(log.datetime).toDateString()}</td>
                                <td className={styles.tablecolumns}>{new Date(log.datetime).toLocaleTimeString()}</td>
                            </tr>
                        )) : <tr><td>This user has no logs</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )

}
