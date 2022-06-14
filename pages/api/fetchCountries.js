import React from "react";
import { BaseUrl } from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'


export default function useGetCountries() {
    const dispatch = useDispatch();

    const [response, setResponse] = React.useState({});
    const { userData } = useSelector(state => state.registerJob);



    function getCountries(token) {
        console.log("Getting countries")
        console.log(token)

        const permisisons = "view_country";
        permisisons.includes("view_country") ?
            axios.get(`${BaseUrl}auth/countries`, {
                "headers": { "Content-type": "application/json", Authorization: `Bearer ${token}` },
            })
            .then(function(res) {
                console.log(res.data + "RESPONSE")
                setResponse(res.data)
                setInterval(refreshuserToken(userData.refreshToken), 60000);
            })
            .catch(function(error) {
                setResponse(error)
            }) : setResponse("You are not authorized to view this info.")
            // console.log(response)

    }

    function refreshuserToken(refresherToken) {

        console.log("Refreshin tokn")
        const useValues = {
            "refreshToken": refresherToken,
            "clientType": "mobile"
        }
        axios.post(`${BaseUrl}auth/refresh-token`, useValues, {
                "headers": { "Content-type": "application/json" },
            })
            .then(function(response) {
                if (response.status === 200) {
                    dispatch(addToken(response.data.data.token))
                    dispatch(addUserData(response.data.data))
                }
            })
            .catch(function(error) {})
    }
    return [getCountries, response]
}