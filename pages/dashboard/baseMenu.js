import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router';
import { useState,useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios'
import Loader from '../../loading';


export default function BaseMenu() {
    const [errorMag, setErrorMag] = useState('');
    const [launchLoader, setLaunchLoader] = useState('');
    return(
        <div className="dashboard_base_menu">
            <div className="dashboard_base_left">

            <h1 className="dashboard_base_left_h1">
                        {/* <svg className="dashboard_base_left_h1_logo" width="20" height="40" viewBox="0 0 49 110" fill="#000">
                            <path d="M26.5111 84.1634C23.7607 87.4214 20.3293 90.0404 16.4571 91.8372C12.5849 93.634 8.36568 94.5651 4.09472 94.5652V109.193C14.2172 109.201 24.0334 105.731 31.8902 99.3675C39.7469 93.0037 45.1642 84.1347 47.2297 74.2541C49.2952 64.3736 47.8827 54.0851 43.2301 45.1215C38.5775 36.1579 30.9691 29.0667 21.6861 25.0423C24.4359 21.7836 27.8672 19.1641 31.7395 17.3672C35.6118 15.5704 39.8314 14.6397 44.1025 14.6405V0.0649414C33.9802 0.064531 24.167 3.54208 16.3154 9.91193C8.46387 16.2818 3.05362 25.1548 0.995808 35.0367C-1.06201 44.9186 0.358381 55.2058 5.01767 64.1657C9.67696 73.1256 17.2905 80.2109 26.5763 84.2285L26.5111 84.1634ZM15.2442 38.2395C20.6341 40.4416 25.2466 44.19 28.4969 49.0095C31.7472 53.829 33.4887 59.5024 33.5007 65.3102C33.5002 67.2093 33.3124 69.1037 32.94 70.9661C27.5501 68.7641 22.9375 65.0156 19.6873 60.1961C16.437 55.3766 14.6954 49.7033 14.6835 43.8955C14.684 41.9964 14.8718 40.102 15.2442 38.2395Z" fill="white"/>
                        </svg> */}
                        D-board
                        </h1>

                        <nav className="dashboard_base_left_nav">
                            <ul className="dashboard_base_left_nav_ul">
                                <li className="dashboard_base_left_nav_ul_li">
                                <svg id="icon-dashboard" viewBox="0 0 24 24">
<path d="M12.984 3h8.016v6h-8.016v-6zM12.984 21v-9.984h8.016v9.984h-8.016zM3 21v-6h8.016v6h-8.016zM3 12.984v-9.984h8.016v9.984h-8.016z"></path>
</svg>

  <Link href="../board/home"> Dashboard </Link>
                                </li>
                             
                            </ul>
                        </nav>
            </div>
           
        </div>
    )
}