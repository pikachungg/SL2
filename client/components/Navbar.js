import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'

export default function Login(props) {
    let optionalStyles = null

    if (props.isLogin){
        optionalStyles = {
            "display": "None"
        }
    }
    else{
        optionalStyles = {
            "display": "Block"
        }
    }

    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('user_sl2') === null){
        router.replace('/login')
        }
    }, [])

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        router.replace('/login')
    }

    return (
        <div>
            <div className={styles.navbar}>
                <img src="./images/RIT_hor.png" alt="RIT Logo" className={styles.ritLogo}/>
                <div className={styles.verticalLine}></div>
                <h1 className={styles.title}>Student Login Logger</h1>
                <button onClick={logout} style={optionalStyles} className={styles.logOut} id='logOut'>Log out</button>
            </div>
            <div className={styles.buttomline}></div>
        </div>
    )
}