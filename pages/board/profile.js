import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router';
import { useState,useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios'
import dynamic from 'next/dynamic'
import { VictoryPie } from "victory";
import Loader from '../../loading';
import BaseMenu from '../dashboard/baseMenu';
import BaseHeader from '../dashboard/baseHeader';
import svgService from '../../dataservices';
import { connect, useDispatch, useSelector } from 'react-redux';
import useprofile from '../api/profile'

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
    avatar:<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
    <path d="M247.2 68.672c-32.512 24.192-41.248 62.496-39.648 82.88 2.048 24.928 7.104 57.376 7.104 57.376s-10.016 5.44-10.016 27.328c3.488 54.944 21.856 31.232 25.632 55.328 9.088 58.048 29.856 47.712 29.856 79.392 0 52.768-21.76 77.44-89.696 106.688-68.16 29.376-138.432 66.336-138.432 130.336v32h576v-32c0-64-70.304-100.96-138.496-130.304-67.936-29.248-89.632-53.888-89.632-106.688 0-31.68 20.704-21.344 29.824-79.392 3.808-24.096 22.144-0.384 25.696-55.328 0-21.888-10.048-27.328-10.048-27.328s5.056-32.448 7.072-57.376c2.080-26.144-12.736-81.952-73.6-99.072-10.656-10.88-17.856-28.192 14.912-45.568-71.68-3.36-88.352 34.144-126.528 61.728z"></path>
    </svg>,
    search:<svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.01808 16C8.54833 15.9996 10.0345 15.4054 11.2399 14.312L15.0298 18.708L16.2488 17.294L12.4589 12.898C13.4021 11.4997 13.9147 9.77544 13.9151 8C13.9151 3.589 10.8209 0 7.01808 0C3.21525 0 0.121094 3.589 0.121094 8C0.121094 12.411 3.21525 16 7.01808 16ZM7.01808 2C9.87084 2 12.1908 4.691 12.1908 8C12.1908 11.309 9.87084 14 7.01808 14C4.16531 14 1.84534 11.309 1.84534 8C1.84534 4.691 4.16531 2 7.01808 2Z" fill="#828282"/>
    </svg>,
    messageIcon:<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1H2C1.4485 1 1 1.4485 1 2V11L3 9H10C10.5515 9 11 8.5515 11 8V2C11 1.4485 10.5515 1 10 1ZM4.5 6C4.36865 5.99997 4.23858 5.97406 4.11724 5.92376C3.9959 5.87347 3.88565 5.79976 3.79279 5.70686C3.69993 5.61395 3.62628 5.50367 3.57604 5.3823C3.52581 5.26093 3.49997 5.13085 3.5 4.9995C3.50003 4.86814 3.52594 4.73808 3.57624 4.61674C3.62653 4.4954 3.70024 4.38515 3.79314 4.29229C3.88605 4.19943 3.99633 4.12578 4.1177 4.07554C4.23907 4.02531 4.36915 3.99947 4.5005 3.9995C4.76578 3.99957 5.02017 4.10501 5.20771 4.29264C5.39525 4.48027 5.50057 4.73472 5.5005 5C5.50043 5.26528 5.39499 5.51967 5.20736 5.70721C5.01973 5.89475 4.76528 6.00007 4.5 6ZM7.5 6C7.36865 5.99997 7.23858 5.97406 7.11724 5.92376C6.9959 5.87347 6.88565 5.79976 6.79279 5.70686C6.69993 5.61395 6.62628 5.50367 6.57604 5.3823C6.52581 5.26093 6.49997 5.13085 6.5 4.9995C6.50003 4.86814 6.52594 4.73808 6.57624 4.61674C6.62653 4.4954 6.70024 4.38515 6.79314 4.29229C6.88605 4.19943 6.99633 4.12578 7.1177 4.07554C7.23907 4.02531 7.36915 3.99947 7.5005 3.9995C7.76578 3.99957 8.02017 4.10501 8.20771 4.29264C8.39525 4.48027 8.50057 4.73472 8.5005 5C8.50043 5.26528 8.39499 5.51967 8.20736 5.70721C8.01973 5.89475 7.76528 6.00007 7.5 6Z" fill="#51CBFF"/>
    </svg>,
    edit:<svg id="icon-edit" viewBox="0 0 28 28">
    <path d="M13.875 18.5l1.813-1.813-2.375-2.375-1.813 1.813v0.875h1.5v1.5h0.875zM20.75 7.25c-0.141-0.141-0.375-0.125-0.516 0.016l-5.469 5.469c-0.141 0.141-0.156 0.375-0.016 0.516s0.375 0.125 0.516-0.016l5.469-5.469c0.141-0.141 0.156-0.375 0.016-0.516zM22 16.531v2.969c0 2.484-2.016 4.5-4.5 4.5h-13c-2.484 0-4.5-2.016-4.5-4.5v-13c0-2.484 2.016-4.5 4.5-4.5h13c0.625 0 1.25 0.125 1.828 0.391 0.141 0.063 0.25 0.203 0.281 0.359 0.031 0.172-0.016 0.328-0.141 0.453l-0.766 0.766c-0.141 0.141-0.328 0.187-0.5 0.125-0.234-0.063-0.469-0.094-0.703-0.094h-13c-1.375 0-2.5 1.125-2.5 2.5v13c0 1.375 1.125 2.5 2.5 2.5h13c1.375 0 2.5-1.125 2.5-2.5v-1.969c0-0.125 0.047-0.25 0.141-0.344l1-1c0.156-0.156 0.359-0.187 0.547-0.109s0.313 0.25 0.313 0.453zM20.5 5l4.5 4.5-10.5 10.5h-4.5v-4.5zM27.438 7.063l-1.437 1.437-4.5-4.5 1.437-1.437c0.578-0.578 1.547-0.578 2.125 0l2.375 2.375c0.578 0.578 0.578 1.547 0 2.125z"></path>
    </svg>,
    search2:<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0493 2.13916C17.1125 2.13916 21.2217 6.24839 21.2217 11.3115C21.2217 16.3747 17.1125 20.4839 12.0493 20.4839C6.98618 20.4839 2.87695 16.3747 2.87695 11.3115C2.87695 6.24839 6.98618 2.13916 12.0493 2.13916ZM12.0493 18.4456C15.9904 18.4456 19.1834 15.2526 19.1834 11.3115C19.1834 7.36945 15.9904 4.17747 12.0493 4.17747C8.10725 4.17747 4.91526 7.36945 4.91526 11.3115C4.91526 15.2526 8.10725 18.4456 12.0493 18.4456ZM20.6968 18.518L23.58 21.4001L22.1379 22.8422L19.2558 19.9591L20.6968 18.518Z" fill="#1F4173"/>
    </svg>,
    down:<svg id="icon-chevron-down" viewBox="0 0 24 24">
    <path d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
    </svg>
    
    


}



export default function Profle() {
    const [errorMagg, launchLoader,editProfile , setErrorMag] = useprofile();

   const { userData } = useSelector(state => state.registerJob);
    
    return(
        <div>
        <BaseMenu />
            <div className="templatePreset">
            <div className="templatePostPreset">
                
           { (launchLoader.length > 0) ? <Loader /> : null }
           {/* {
                    (errorMagg.length > 0)? (<div className="erroMag"> <button onClick={()=>{setErrorMag('')}}>X</button> {errorMagg} </div>):<>    </>
                }  */}
        <div className="profile">
            <div className="profile_wrapper">
                <h4 className="profile_wrapper_heading">
                    Profile Settings
                </h4>
                <div className="profile_wrapper_details">
                    <div className="profile_wrapper_details_avatar">
                        {svgService.users_icon}
                    </div>
                    <div className="profile_wrapper_details_details">
                        <p className="profile_wrapper_details_details_name">{userData.user.firstName} {userData.userlastName}</p>
                        <p className="profile_wrapper_details_details_mail">{userData.user.email}</p>
                        <p className="profile_wrapper_details_details_no"> {userData.user.phoneNumber}</p>
                    </div>
                </div>

                <div className="profile_wrapper_edit_form">

                <h4 className="profile_wrapper_details_heading">
                   Edit Profile Details
                </h4>


                     
                <Formik
                    
                    initialValues={{ 
                        "firstName": "",
                        "lastName": "",
                        "dateOfBirth": "",
                        "avatar": ""
                 }}
                   
                    onSubmit={(values) => {
                        editProfile(values)
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                <form className="login_container_login_form_form" onSubmit={handleSubmit}>
                    <label className="login_container_login_form_form_label"> 
                        First Name
                    </label>
                    <input    onFocus={(e) => {
                        console.log('Focused on input');
                    }} className="login_container_login_form_form_input" 
                    placeholder={userData.user.firstName}
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName} />


                    <label className="login_container_login_form_form_label"> 
                       Last Name
                    </label>
                    <input className="login_container_login_form_form_input"
                    placeholder={userData.user.lastName}

                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                       />
                    

                    <div className="login_container_login_form_form_inliner">
                    <div className="login_container_login_form_form_inliner_mapper">

                    <label className="login_container_login_form_form_label"> 
                        Date of Birth
                    </label>
                    <input    onFocus={(e) => {
                        console.log('Focused on input');
                    }} className="login_container_login_form_form_input upload" 
                    placeholder={userData.user.firstName}
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dateOfBirth} />
                   </div>
                   <div className="login_container_login_form_form_inliner_mapper">


                    <label className="login_container_login_form_form_label"> 
                        Avatar
                    </label>
                    <input    onFocus={(e) => {
                        console.log('Focused on input');
                    }} className="login_container_login_form_form_input " 
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.avatar} />
                    </div>
              
              </div>



                    <button className="login_container_login_form_form_login_button" type='submit' onClick={handleSubmit}>
                        Update Profile Details 
                        <svg className="login_container_login_form_form_login_button_icon" width="7" height="11" viewBox="0 0 7 11" fill="none">
                            <path d="M0.327414 0.32733C0.65285 0.00189272 1.18049 0.00189272 1.50592 0.32733L6.08926 4.91066C6.41469 5.2361 6.41469 5.76374 6.08926 6.08917L1.50592 10.6725C1.18049 10.9979 0.65285 10.9979 0.327414 10.6725C0.00197664 10.3471 0.00197664 9.81943 0.327414 9.494L4.32149 5.49992L0.327414 1.50584C0.00197664 1.1804 0.00197664 0.652766 0.327414 0.32733Z" fill="white"/>
                        </svg>

                    </button>
                   
                </form>
                   )}
                   </Formik>

                </div>


               
               
               
            </div>
        </div>
             





            </div>
            </div>
        <BaseHeader />
        </div>
        
       
    )
}
