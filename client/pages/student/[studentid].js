import Navbar from "../../components/Navbar";
import PinnedStudents from '../../components/PinnedStudents';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";


export default function StudentPage(){
    const router = useRouter()
    const { studentid } = router.query
    const [student, setStudent] = useState({})

    useEffect(() => {
		if (localStorage.getItem("user_sl2")) {
            const endpoint = `http://localhost:8000/students/id/${studentid}`
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
            });
        }
        else{
			router.replace("/login");
        }
    }, [studentid])
    
    if (!studentid) return 'loading'
    return (
        <div>
            <Navbar/>
            <p>Analytics for {student.first_name} {student.last_name} - {student.email}</p>
            <PinnedStudents/>
        </div>
    )
}