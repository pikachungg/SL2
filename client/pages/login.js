import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Login() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      username: e.target.username.value,
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
    await fetch(endpoint, options)
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
                <input placeholder="username" type="text" id="username" name="username"/>
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
 