import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router';
import { useState,useEffect,useMemo } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { AxiospsData, AxiosError } from 'axios'
import dynamic from 'next/dynamic'
import { VictoryPie } from "victory";
import Loader from '../../loading';
import BaseMenu from '../dashboard/baseMenu';
import BaseHeader from '../dashboard/baseHeader';
import svgService from '../../dataservices'
import BaseUrl from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';



const svgs ={
    folder:<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512">
            <path fill='#365289' d="M496 192h-480c-8.832 0-16 7.168-16 16l16 256c0 8.848 7.168 16 16 16h448c8.848 0 16-7.152 16-16l16-256c0-8.832-7.152-16-16-16zM496 96h-176l-32-48c0-8.832-7.152-16-16-16h-192c-8.832 0-16 7.168-16 16v48h-48c-8.832 0-16 7.168-16 16v32c0 8.832 7.168 16 16 16h480c8.848 0 16-7.168 16-16v-32c0-8.832-7.152-16-16-16z"></path>
        </svg>,
    folder_white:<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512">
            <path fill='#fff' d="M496 192h-480c-8.832 0-16 7.168-16 16l16 256c0 8.848 7.168 16 16 16h448c8.848 0 16-7.152 16-16l16-256c0-8.832-7.152-16-16-16zM496 96h-176l-32-48c0-8.832-7.152-16-16-16h-192c-8.832 0-16 7.168-16 16v48h-48c-8.832 0-16 7.168-16 16v32c0 8.832 7.168 16 16 16h480c8.848 0 16-7.168 16-16v-32c0-8.832-7.152-16-16-16z"></path>
        </svg>,
    pattern:<svg width="66" height="64" viewBox="0 0 66 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0V54.6917C0 60.0281 3.20827 63.714 11.2289 63.1874H57.0594C86.028 27.0803 31.09 6.01785 0 0Z" fill="white" fillOpacity="0.2"/>
    <path d="M0 12.6376V56.3563C0 60.622 2.57713 63.5685 9.01996 63.1475H45.8346C69.1044 34.2847 24.974 17.448 0 12.6376Z" fill="white" fillOpacity="0.3"/>
    <path d="M0 22.1157V57.6372C0 61.1031 1.99859 63.4971 6.99507 63.1551H35.5452C53.5912 39.704 19.3676 26.0242 0 22.1157Z" fill="white" fillOpacity="0.3"/>
    <path d="M0 41.072V54.7626C0 56.3423 0 61.6079 6.95124 63.1701H14.4372H19.6434C29.6162 50.5426 10.7031 43.1766 0 41.072Z" fill="white" fillOpacity="0.4"/>
    </svg>
    ,
    settings:<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 768 768">
    <path d="M319.936 271.936c65.248 0 118.464 48.992 126.4 112.064h112.512c-1.056-15.104-3.104-29.92-6.784-44.128l90.912-52.48-64.032-110.912-90.784 52.416c-28.64-28.192-64.32-49.024-104.16-60.064v-104.896h-128.064v104.896c-39.84 11.008-75.552 31.872-104.192 60.032l-90.752-52.384-64.032 110.912 90.848 52.448c-4.96 19.264-7.904 39.296-7.904 60.096s2.912 40.864 7.904 60.096l-90.848 52.48 64.032 110.88 90.72-52.384c28.64 28.192 64.384 49.024 104.224 60.032v104.896h128.064v-225.76c-18.912 11.008-40.608 17.792-64.064 17.792-70.688 0-128-57.312-128-128s57.312-128.032 128-128.032zM735.936 576c0-11.84-2.112-23.104-5.152-33.984l59.424-34.304-31.968-55.36-59.008 34.048c-16.032-16.32-36.48-28-59.296-33.952v-68.448h-63.936v68.448c-22.88 5.888-43.328 17.568-59.392 33.92l-58.912-34.016-31.968 55.36 59.296 34.208c-3.040 10.944-5.184 22.208-5.184 34.080s2.144 23.168 5.184 34.080l-59.296 34.208 31.968 55.36 58.912-34.016c16.064 16.352 36.544 28.032 59.392 33.92v68.448h63.936v-68.48c22.816-5.952 43.264-17.632 59.296-33.952l59.040 34.080 31.968-55.36-59.424-34.304c3.008-10.88 5.12-22.144 5.12-33.984zM607.872 639.936c-35.328 0-63.936-28.64-63.936-63.936s28.64-63.936 63.936-63.936 63.936 28.64 63.936 63.936-28.608 63.936-63.936 63.936z"></path>
    </svg>,
    


}
const sampleData =[
    {  y: 1 },
    {  y: 1 },
    {  y: 1 },
]




export default  function  Home() {
    // 
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.registerJob);
   const { userData } = useSelector(state => state.registerJob);
   const [newWriter, showNewWriterDialog] = useState("hidden")
   console.log(userData + "[][]")
    // console.log(token.length <= 0);
    token == null ? router.push('../login') : null;

    return(
        <div>   
        <BaseMenu />
            <div className="templatePreset">
            <div className="templatePostPreset">
                
                <div className="home_writer">
                    <div className="home_writer_container">
                        <div>
                        
                        {/* STATISTICS  */}
                        <div className="home_writer_container_statistics">
                    
                            <p className="home_writer_container_statistics_title">
                                Template Heading
                            </p>
                            
                            <div className="home_writer_container_statistics_container_wrapper">
                                <div className="home_writer_container_statistics_container color_navy">
                                {svgs.pattern}
                                   {svgs.folder_white}
                                   <div className="home_writer_container_statistics_container_title">
                                       Dashboard Layout Views
                                   </div>
                                   <div className="home_writer_container_statistics_container_projects">\
                                   {/* SOME DATA */}
                                   </div>
                                {svgs.pattern}

                                </div>
                            

                                <div className="home_writer_container_statistics_container color_orange">
                                {svgs.pattern}
                                   {svgs.folder}
                                   <div className="home_writer_container_statistics_container_title">
                                   Dashboard Layout Views

                                   </div>
                                   <div className="home_writer_container_statistics_container_projects">
                                                                      {/* SOME DATA */}

                                   </div>
                                {svgs.pattern}

                            </div>
                            {/* GREEN */}
                            <div className="home_writer_container_statistics_container color_green">
                                {svgs.pattern}
                                   {svgs.folder_white}
                                   <div className="home_writer_container_statistics_container_title">
                                   Dashboard Layout Views

                                   </div>
                                   <div className="home_writer_container_statistics_container_projects">
                                                                      {/* SOME DATA */}

                                   </div>
                                {svgs.pattern}
                                </div>
                                {/* BLACK */}
                                <div className="home_writer_container_statistics_container color_black">
                                {svgs.pattern}
                                   {svgs.folder_white}
                                   <div className="home_writer_container_statistics_container_title">
                                   Dashboard Layout Views

                                   </div>
                                   <div className="home_writer_container_statistics_container_projects">
                                                                          {/* SOME DATA */}

                                   </div>
                                {svgs.pattern}
                                </div>
                            </div>
                            
                        </div>
                        </div>
                        <div className="home_writer_container_recent_activities">
                          
                            <div className="home_writer_container_recent_activities_activities">
                                
                                {/* FILTER */}
                                
                                {/* CARDS */}
                                <div className="home_writer_container_recent_activities_cards">
                                    <div className="home_writer_container_recent_activities_cards_container">
                                       
                                            <p className="home_writer_container_statistics_title home">
                                                {svgService.users_icon}
                                Country List

                            </p>


                                                                      
                                   

                                    </div>
                                </div>

                            </div>
                            <div className="home_writer_container_recent_activities_pay">
                                <div className="home_writer_container_recent_activities_pay_header">
                                    {svgService.payment_icon}
                                    <p className="home_writer_container_recent_activities_pay_header_heading">
                                        Summary of Dashboard Activity
                                    </p>
                                </div>
                                <div className="home_writer_container_recent_activities_pay_sub_content">
                                    <p className="home_writer_container_recent_activities_pay_sub_content_heading">
                                        Sub heading
                                    </p>
                                    <p className="home_writer_container_recent_activities_pay_sub_content_sub_sub">
                                        From 1-12th June 2022
                                    </p>
                                </div>
                                <div className="home_writer_container_recent_activities_pay_container">

                                <div className="home_writer_container_recent_activities_pay_chart_content">
                                    <p className="home_writer_container_recent_activities_pay_chart_content_amount">
                                        {/* KES {userData.payments.approved} */}
                                       
                                    </p>
                                    <p className="home_writer_container_recent_activities_pay_chart_content_amount_pr">
                                        Dashboard Activity
                                    </p>
                                </div>
                                <div className="home_writer_container_recent_activities_pay_chart">
                                <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={100}
                                data={sampleData}
                                />
                                </div>
                                
                                </div>
                                <div className="home_writer_container_recent_activities_pay_key">
                                    <div className="home_writer_container_recent_activities_pay_key_key color_green">
                                        Monitor 1
                                    </div>
                                    <div className="home_writer_container_recent_activities_pay_key_key color_orange">
                                        Monitor 2
                                    </div>
                                    <div className="home_writer_container_recent_activities_pay_key_key color_red">
                                        Monitor 3 
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>








            </div>
            </div>
        <BaseHeader />
        </div>
        
       
    )
}

