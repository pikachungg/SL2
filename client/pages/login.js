import Head from 'next/head'
import Navbar from '../components/Navbar'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = 'http://localhost:8000/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    }
    let res = await fetch(endpoint, options)
    if (res.status === 200){
      let user = await res.json()
      localStorage.setItem('user_sl2', user)
      router.replace('/')
    }
    else{
      //Handler error here
      console.log("Wrong username")
    }
    
  }

  return (
     <div>
       <Head>
            <title>SL2 | Login</title>
       </Head>
       <main>
         <div className={styles.container}>
            <Navbar isLogin={true} helloworld={"hello world"}/>
            <div className={styles.bodytext}>
              <form onSubmit={handleSubmit} className={styles.loginform}>
                <h2>Faculty Login</h2>
                <div>
                  <label for="email">RIT Username</label><br></br>
                  <input placeholder="| enter RIT username" type="text" id="email" name="email"/>
                </div>
                <div>
                  <label for="email">Password</label><br></br>
                  <input placeholder="| enter password" type="password" id="password" name="password"/>
                </div>
                <button type='submit'>Login</button>
                <h3>Need assistance? <br></br>
                Please contact the ITS Service Desk at Phone Number 585-475-5000 or visit <a href="help.rit.edu">help.rit.edu.</a></h3>
              </form>
              <div className={styles.introtext}>
                <h1>Welcome to RIT SL2</h1>
                <h2>View login data analytics for students in your course sections for the semester to help set them up for a successful semester at the iSchool.</h2>
              </div>
            </div>
          </div>
       </main>
     </div>
   )
 }
 