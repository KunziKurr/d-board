import React from "react";
import { BaseUrl } from '../../utils/baseUrl'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'


export default function useGetCountries() {
    const dispatch = useDispatch();

    // const { token } = useSelector(state => state.registerJob);
    const [response, setResponse] = React.useState({});
    const maker = true;


    function getCountries(token) {

        axios.get(`${BaseUrl}auth/countries`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(function(res) {
                console.log(res.data + "RESPONSE")

            })
            .catch(function(error) {
                setResponse(error)
            })
            // console.log(response)

    }
    return [getCountries]
}