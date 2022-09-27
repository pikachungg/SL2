import styles from '../styles/PinnedStudents.module.css'
import { MdGroupAdd, MdRemoveCircle } from 'react-icons/md'
import { IconContext } from 'react-icons';
import { useEffect, useState } from 'react';

export default function PinnedStudents(){

    const [pinnedStudents, setPinnedStudents] = useState([])

    useEffect( () => {
        const endpoint = `http://localhost:8000/professors/uid/${localStorage.getItem("user_sl2")}`
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
        
        fetch(endpoint, options)
        .then(res => res.json())
        .then( data => {
            let pinnedStudents = data.pinned
            setPinnedStudents(pinnedStudents)
        })
    }, [])

    const getStudentInfo = () => {
        const endpoint = `http://localhost:8000/professors/uid/${localStorage.getItem("user_sl2")}`   
    }

    const removePin = (student) => {
        alert(`Removed ${student}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <IconContext.Provider value={{ color: '#FF6F00', size: "20px"}}>
                    <MdGroupAdd/>
                </IconContext.Provider>
                <h4 className={styles.titletext}>PINNED STUDENTS</h4>
            </div>
            <table className={styles.table}>
                {
                    pinnedStudents.map( student => (
                        <tr className={styles.tablerow}>
                            <p className={styles.tablerowtext}>{student}</p>
                            <IconContext.Provider value={{ color: '#FF6F00', size: "20px"}}>
                                <MdRemoveCircle className={styles.deleteicon} onClick={ () => removePin(student)}/>
                            </IconContext.Provider>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}