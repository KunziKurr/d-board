import React from "react";
import { BaseUrl } from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { addToken, addUserData } from '../../store/actions/actions'




export default function useRefresh() {

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


    function refreshUser() {
        const useValues = {
            "refreshToken": "bcd1ed76-2f40-4647-a1d8-22e26db9af91",
            "clientType": "mobile"
        }
        axios.post(`${BaseUrl}auth/refresh-token`, useValues, {
                "headers": { "Content-type": "application/json" },
            })
            .then(function(response) {
                setLaunchLoader('')
                if (response.status === 200) {
                    dispatch(addToken(response.data.data.token))
                    dispatch(addUserData(response.data.data))
                }
                return
            })
            .catch(function(error) {
                setLaunchLoader('')
                setErrorMag("Invalid username/password")
            })
    }


    // RETURN ITEMS TO LOGIN
    return [errorMagg, launchLoader, setErrorMag, refreshUser]
}