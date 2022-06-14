import Head from 'next/head'
import Image from 'next/image'
import Login from './login'
import Home from './board/home'
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from 'react-redux';


export default function Landing(props) {
  const { token } = useSelector(state => state.registerJob);
  const router = useRouter()

    
  return (
    <div>
      <Head>
        <title>Dashboard View</title>
        <meta name="description" content="Manage your your applications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        
      </div>
      {
          token == null ? <Login/> : <Home />
      }

    </div>
  )
}
