import React from "react";
import { BaseUrl } from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'


export default function useGetCountries() {
    const dispatch = useDispatch();

    // const { token } = useSelector(state => state.registerJob);

    const [response, setResponse] = React.useState({});


    function getCountries(token) {
        console.log(token)
        const permisisons = JSON.parse(atob(token.split('.')[1])).data.permissions;
        permisisons.includes("view_country") ?
            axios.get(`${BaseUrl}auth/countries`, {
                "headers": { "Content-type": "application/json", Authorization: `Bearer ${token}` },
            })
            .then(function(res) {
                console.log(res.data + "RESPONSE")
                setResponse(res.data)

            })
            .catch(function(error) {
                setResponse(error)
            }) : setResponse("You are not authorized to view this info.")
            // console.log(response)

    }
    return [getCountries, response]
}