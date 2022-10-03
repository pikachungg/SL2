import { useState, useEffect } from "react"


export default function StudentPinCard(props){

    const [student, setStudent] = useState({})

    useEffect( () => {
        const endpoint = `http://localhost:8000/students/id/${props.uid}`
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
        
        fetch(endpoint, options)
        .then(res => res.json())
        .then( data => {
            setStudent(data)
        })
    }, [])

    return(
        <td>
            {`${student.first_name} ${student.last_name}`}
        </td>
    )
}