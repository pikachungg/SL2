import { useRouter } from 'next/router'
import StudentFilter from "../../components/StudentFilter";
import PinnedStudents from '../../components/PinnedStudents';
import Navbar from "../../components/Navbar";

export default function CoursePage(){

    const router = useRouter()
    const { courseid } = router.query

    return (
        <div>
            <Navbar/>
            {/* Graph hoes here */}
            <StudentFilter courseid={courseid}/>
            <PinnedStudents/>
        </div>
    )
}