import Head from 'next/head'
import Image from 'next/image'
import Login from './login'
// import Base from './dashboard/base'
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from 'react-redux';


export default function Home(props) {
  // const { token } = useSelector(state => state.registerJob);

  const router = useRouter()


  // token.length <= 0 ? router.push('../onboarding/login') : null;



  // (query.token) ? router.push({
  //   pathname: '/onboarding/newWriter',
  //   query: { token: query.token },
  // }) : null;
  
  return (
    <div>
      <Head>
        <title>Sotoo | Welcome to sotoo</title>
        <meta name="description" content="Manage your team without missing anything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        
      </div>
      <Login />
    </div>
  )
}
