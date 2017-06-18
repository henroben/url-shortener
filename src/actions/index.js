import axios from 'axios';
import { ACCESS_TOKEN } from './../../config/config';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const GET_SHORT_URL = 'GET_SHORT_URL';
export const GET_LONG_URL = 'GET_LONG_URL';

const ROOT_URL_SHORTEN = `https://api-ssl.bitly.com/v3/shorten?access_token=${ACCESS_TOKEN}`;
const ROOT_URL_LOOKUP = `https://api-ssl.bitly.com/v3/expand?access_token=${ACCESS_TOKEN}`;


export function fetchShortUrl(url) {
    // Query bitly.com for shortened url
    return function (dispatch) {
        if(url !== undefined || url !== null) {
            dispatch({
                type: LOADING,
                payload: true
            });
        }
        const request = `${ROOT_URL_SHORTEN}&longUrl=${url}`;

        axios.get(request).then((response) => {
            console.log('reqest made ', response);
            if(response.data.status_txt === "ALREADY_A_BITLY_LINK") {
                dispatch(fetchLongUrl(url));
                return dispatch({
                    type: ERROR,
                    payload: 'Already a bitly link'
                });
            } else {
                return dispatch({
                    type: GET_SHORT_URL,
                    payload: response.data.data.url
                });
            }
        }).catch(function (error) {
            console.log('error', error);
            return dispatch({
                type: ERROR,
                payload: response.data.data.url
            });
        });
    };

}

export function fetchLongUrl(url) {
    console.log('fetch long url');

    return function (dispatch) {
        // Query bitly.com for long version of shortened url
        const request = `${ROOT_URL_LOOKUP}&shortUrl=${url}`;
        axios.get(request).then((response) => {
            console.log(response);
            return dispatch({
                type: GET_LONG_URL,
                payload: response.data.data.expand[0].long_url
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    }


}