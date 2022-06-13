import Link from 'next/link'
import Box from '@mui/material/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from '../loading';
import { useRouter } from 'next/router';
import useLogin from './api/login'



export default function Login() {
    const [errorMagg, launchLoader,makeLogin,setErrorMag] = useLogin();

    return(
       <div className="login">
           { (launchLoader.length > 0) ? <Loader /> : null }
            <div className="login_container">
                <div className="login_container_sotoo">
                        <h1 className="login_container_sotoo_h1">
                        <svg className="login_container_sotoo_h1_logo" width="49" height="110" viewBox="0 0 49 110" fill="#000">
                            <path d="M26.5111 84.1634C23.7607 87.4214 20.3293 90.0404 16.4571 91.8372C12.5849 93.634 8.36568 94.5651 4.09472 94.5652V109.193C14.2172 109.201 24.0334 105.731 31.8902 99.3675C39.7469 93.0037 45.1642 84.1347 47.2297 74.2541C49.2952 64.3736 47.8827 54.0851 43.2301 45.1215C38.5775 36.1579 30.9691 29.0667 21.6861 25.0423C24.4359 21.7836 27.8672 19.1641 31.7395 17.3672C35.6118 15.5704 39.8314 14.6397 44.1025 14.6405V0.0649414C33.9802 0.064531 24.167 3.54208 16.3154 9.91193C8.46387 16.2818 3.05362 25.1548 0.995808 35.0367C-1.06201 44.9186 0.358381 55.2058 5.01767 64.1657C9.67696 73.1256 17.2905 80.2109 26.5763 84.2285L26.5111 84.1634ZM15.2442 38.2395C20.6341 40.4416 25.2466 44.19 28.4969 49.0095C31.7472 53.829 33.4887 59.5024 33.5007 65.3102C33.5002 67.2093 33.3124 69.1037 32.94 70.9661C27.5501 68.7641 22.9375 65.0156 19.6873 60.1961C16.437 55.3766 14.6954 49.7033 14.6835 43.8955C14.684 41.9964 14.8718 40.102 15.2442 38.2395Z" fill="white"/>
                        </svg>
                        D-board
                        </h1>
                        <span className="login_container_sotoo_slogan">
                            Practial D-Board
                        </span>
                </div>
                <div className="login_container_login_form">
               

                    <span className="login_container_login_form_heading">
                        Welcome to D-Board
                    </span>
                    
                    <Formik
                    
                        initialValues={{ username: '', password: '' }}
                        validate={values => {
                            const errors = {};
                           if(!values.username){
                            errors.password = 'Required';
                           }
                          
                            // PASSWORD VALIDATION
                            if(!values.password){
                                errors.password = 'Required';
                            }
                            else if(values.password.length <= 5){
                                errors.password = 'Your password is too short'
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            makeLogin(values)
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
                        <svg width="17" height="17"id="icon-mail" viewBox="0 0 32 32">
                            <path d="M15.996 15.457l16.004-7.539v-3.918h-32v3.906zM16.004 19.879l-16.004-7.559v15.68h32v-15.656z"></path>
                        </svg>

                            Username
                        </label>
                        <input    onFocus={(e) => {
                            console.log('Focused on input');
                        }} className="login_container_login_form_form_input" 
                        type="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username} />
                        {errors.username && touched.username && errors.username}

            <label className="login_container_login_form_form_label"> 
                <svg height="17" width="17" viewBox="0 0 24 24">
                <path d="M6.984 14.016q0.797 0 1.406-0.609t0.609-1.406-0.609-1.406-1.406-0.609-1.383 0.609-0.586 1.406 0.586 1.406 1.383 0.609zM12.656 9.984h10.359v4.031h-2.016v3.984h-3.984v-3.984h-4.359q-0.609 1.641-2.273 2.813t-3.398 1.172q-2.484 0-4.242-1.758t-1.758-4.242 1.758-4.242 4.242-1.758q1.734 0 3.398 1.172t2.273 2.813z"></path>
                </svg>

                           Password
                        </label>
                        <input className="login_container_login_form_form_input"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                           />
                        {errors.password && touched.password && errors.password}
                        {
                    (errorMagg.length > 0)? (<div className="erroMag"> <button onClick={()=>{setErrorMag('')}}>X</button> {errorMagg} </div>):<>    </>
                }
                        <button className="login_container_login_form_form_login_button" type='submit' onClick={handleSubmit}>
                            Login 
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
    )
}