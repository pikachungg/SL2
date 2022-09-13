import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
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
    <div className={styles.container}>
      <p>This is dashboard page</p>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
