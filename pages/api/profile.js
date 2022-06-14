import React from "react";
import { BaseUrl } from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { addToken, addUserData } from '../../store/actions/actions'




export default function useprofile() {

    // STATE ITEMS
    const router = useRouter();
    const [errorMagg, setErrorMag] = useState('');
    const [launchLoader, setLaunchLoader] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.registerJob);


    // START LOADER
    useEffect(() => {
        (!window.navigator.onLine) ? setErrorMag("Please Check your internet Connection"): setErrorMag('');
    }, []);

    //    MAKE POST REQ
    function editProfile(params) {
        console.log(token)
        setLaunchLoader('launch');
        console.log(params)
        const useValues = {
            "firstName": params.firstName,
            "lastName": params.lastName,
            "dateOfBirth": params.dateOfBirth,
            "avatar": params.avatar
        }
        console.log(useValues)

        axios.post(`${BaseUrl}auth/update-profile`, useValues, {
                "headers": { "Content-type": "application/json", Authorization: `Bearer ${token}`},
            })
            .then(function(response) {
                setLaunchLoader('')
                if (response.status === 200) {
                    dispatch(addUserData(response.data.data))
                    router.push('../board/home')
                }
                return
            })
            .catch(function(error) {
                setLaunchLoader('')
                setErrorMag("Invalid username/password")
            })
    }


    // RETURN ITEMS TO LOGIN
    return [errorMagg, launchLoader,editProfile , setErrorMag]
}