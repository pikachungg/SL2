import Head from 'next/head'
import LoginStyle from '../styles/Login.module.css'
import Navbar from '../components/Navbar'

export default function Login() {
   return (
     <div>
       <Head>
            <title>SL2 | Login</title>
       </Head>
       <main className={LoginStyle.test}>
            <Navbar/>
            <p>
                This is login page
            </p>
       </main>
     </div>
   )
 }
 