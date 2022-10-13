import { useRouter } from 'next/router'
import StudentFilter from "../../components/StudentFilter";
import PinnedStudents from '../../components/PinnedStudents';
import Navbar from "../../components/Navbar";
import Styles from "../../styles/Courses.module.css"
import { useEffect } from 'react';

export default function CoursePage(){

    const router = useRouter()
    const { courseid } = router.query

    useEffect(() => {
		if (localStorage.getItem("user_sl2")) {
        }
        else{
			router.replace("/login");
        }
    }, [])
    
    return (
        <div>
            <Navbar/>
            {/* Graph hoes here */}
            <StudentFilter courseid={courseid}/>
            <PinnedStudents/>
        </div>
    )
}