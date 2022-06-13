import React from "react";
import { BaseUrl } from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { addToken, addUserData } from '../../store/actions/actions'


export default function useLogin() {

    // STATE ITEMS
    const router = useRouter();
    const [errorMagg, setErrorMag] = useState('');
    const [launchLoader, setLaunchLoader] = useState('');
    const dispatch = useDispatch();

    // START LOADER
    useEffect(() => {
        (!window.navigator.onLine) ? setErrorMag("Please Check your internet Connection"): setErrorMag('');
    }, []);


    //    MAKE POST REQ
    function makeLogin(params) {
        console.log("Making Post Request");
        setLaunchLoader('launch');
        console.log(params.email)
        const useValues = {
            email: params.email,
            password: params.password,
            clientType: "web"
        }

        axios.post(`${BaseUrl}auth/login`, useValues, {
                "headers": { "Content-type": "application/json" },
            })
            .then(function(response) {
                setLaunchLoader('')
                    // localStorage.setItem('token', response.data.jwt);
                console.log(response.data.data)

                if (response.status === 200) {
                    dispatch(addToken(response.data.data.token))
                    dispatch(addUserData(response.data.data.user))


                    router.push({ pathname: "../board/home" })
                }
                return
            })
            .catch(function(error) {
                setLaunchLoader('')
                const resErr = error.response
                if (resErr.status == 400 || resErr.status == 404) {
                    console.log("Mapping Error")
                    setErrorMag(resErr.data.details)
                }
            })
    }


    // RETURN ITEMS TO LOGIN
    return [errorMagg, launchLoader, makeLogin, setErrorMag]
}