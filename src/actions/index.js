import axios from 'axios';
import { ACCESS_TOKEN } from './../../config/config';
import * as types from './types';

const ROOT_URL_SHORTEN = `https://api-ssl.bitly.com/v3/shorten?access_token=${ACCESS_TOKEN}`;
const ROOT_URL_LOOKUP = `https://api-ssl.bitly.com/v3/expand?access_token=${ACCESS_TOKEN}`;


export function fetchShortUrl(url) {
    // Query bitly.com for shortened url
    return function (dispatch) {

        if(url !== undefined || url !== null) {
            dispatch(setLoading());
        }

        const request = `${ROOT_URL_SHORTEN}&longUrl=${url}`;

        return axios.get(request).then((response) => {
            // console.log('response', response);
            if(response.data.status_txt === "ALREADY_A_BITLY_LINK") {
                return dispatch(fetchLongUrl(url));
            } else if (response.data.status_code === 500 && response.data.status_txt !== "ALREADY_A_BITLY_LINK") {
                return dispatch({
                    type: types.ERROR,
                    payload: 'ERROR: ' + response.data.status_txt
                });
            } else {
                return dispatch({
                    type: types.GET_URL,
                    payload: response.data.data.url
                });
            }
        }).catch(function (error) {
            return dispatch({
                type: types.ERROR,
                payload: 'Network Error, please check your connection.'
            });
        });
    };

}

export function setLoading() {
    "use strict";
    return({
        type: types.LOADING,
        payload: true
    });
}

export function fetchLongUrl(url) {

    return function (dispatch) {
        // Query bitly.com for long version of shortened url
        const request = `${ROOT_URL_LOOKUP}&shortUrl=${url}`;
        return axios.get(request).then((response) => {

            return dispatch({
                type: types.GET_URL,
                payload: response.data.data.expand[0].long_url
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    };

}