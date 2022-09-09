import Head from 'next/head'
import Navbar from '../components/Navbar'
import styles from '../styles/Login.module.css'

export default function Login() {

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
      console.log(user)
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
            <Navbar/>
            <form onSubmit={handleSubmit}>
              <div>
                <input placeholder="email" type="text" id="email" name="email"/>
              </div>
              <div>
                <input placeholder="password" type="password" id="password" name="password"/>
              </div>
              <button type='submit'>Login</button>
            </form>
       </main>
     </div>
   )
 }
 