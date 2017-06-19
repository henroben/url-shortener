import { configureMockStore, expect } from '../test_helper';
import thunk from 'redux-thunk';
import nock from 'nock';

import { ACCESS_TOKEN } from './../../config/config';
import * as actions from './../../src/actions';
import * as types from './../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions' , () => {

    describe('setLoading', () => {
        const store = mockStore({
            convertedUrl: {
                loading: false,
                url: null,
                error: null
            }
        });

        let res = store.dispatch(actions.setLoading());

        it('should return correct type and payload', () => {
            expect(res).to.deep.equal({
                type: types.LOADING,
                payload: true
            });
        });

    });

    describe('fetchShortUrl', () => {

        afterEach(() => {
            nock.cleanAll();
        });

        it('dispatches LOADING on start of action', () => {

            const data = 'http%3A%2F%2Fgoogle.com%2F';
            const store = mockStore({
                convertedUrl: {
                    loading: false,
                    url: null,
                    error: null
                }
            });

            store.dispatch(actions.fetchShortUrl(data));
            let res = store.getActions();
            expect(res[0].type).to.equal(types.LOADING);
            expect(res[0].payload).to.equal(true);

        });

        it('dispatches GET_URL when shortened url received', () => {

            const data = "http%3A%2F%2Fgoogle.com%2F";
            const returnData = "http://bit.ly/2tElGoM";
            const store = mockStore({
                convertedUrl: {
                    loading: false,
                    url: null,
                    error: null
                }
            });

            nock('https://api-ssl.bitly.com')
                .get(`/v3/shorten?access_token=${ACCESS_TOKEN}&longUrl=${data}`)
                .reply(200, {
                        data: {
                            url: returnData,
                            new_hash: 0
                        },
                        status_code: 200,
                        status_txt: "OK"
                });

            const expectedActions = [
                { type: 'LOADING', payload: true },
                { type: 'GET_URL', payload: returnData } ];

            return store.dispatch(actions.fetchShortUrl(data)).then(() => {
                // return of async items
                expect(store.getActions()).to.deep.equal(expectedActions);
            });

        });

        it('dispatches ERROR when network 404 received', () => {

            const data = "http%3A%2F%2Fgoogle.com%2F";
            const returnData = "http://bit.ly/2tElGoM";
            const store = mockStore({
                convertedUrl: {
                    loading: false,
                    url: null,
                    error: null
                }
            });

            nock('https://api-ssl.bitly.com')
                .get(`/v3/shorten?access_token=${ACCESS_TOKEN}&longUrl=${data}`)
                .reply(404, {
                    data: {
                        url: returnData,
                        new_hash: 0
                    },
                    status_code: 404,
                    status_txt: "Error"
                });

            const expectedActions = [
                { type: types.LOADING, payload: true },
                { type: types.ERROR, payload: 'Network Error, please check your connection.' } ];

            return store.dispatch(actions.fetchShortUrl(data)).then(() => {
                // return of async items
                expect(store.getActions()).to.deep.equal(expectedActions);
            });

        });

        it('dispatches ERROR when API returns 500 error', () => {

            const data = "http%3A%2F%2Fgoogle.com%2F";
            const returnData = "http://bit.ly/2tElGoM";
            const store = mockStore({
                convertedUrl: {
                    loading: false,
                    url: null,
                    error: null
                }
            });

            nock('https://api-ssl.bitly.com')
                .get(`/v3/shorten?access_token=${ACCESS_TOKEN}&longUrl=${data}`)
                .reply(200, {
                    data: {
                        url: returnData,
                        new_hash: 0
                    },
                    status_code: 500,
                    status_txt: "Error"
                });

            const expectedActions = [
                { type: types.LOADING, payload: true },
                { type: types.ERROR, payload: 'ERROR: Error' } ];

            return store.dispatch(actions.fetchShortUrl(data)).then(() => {
                // return of async items
                expect(store.getActions()).to.deep.equal(expectedActions);
            });

        });

    });

    describe('fetchLongUrl', () => {

        it('dispatches GET_URL when expanded url received', () => {

            const returnData = "http%3A%2F%2Fgoogle.com%2F";
            const data = "http://bit.ly/2tElGoM";
            const store = mockStore({
                convertedUrl: {
                    loading: false,
                    url: null,
                    error: null
                }
            });

            nock('https://api-ssl.bitly.com')
                .get(`/v3/expand?access_token=${ACCESS_TOKEN}&shortUrl=${data}`)
                .reply(200, {
                        data: {
                            expand: [
                                {
                                    long_url: returnData
                                }
                            ],
                            status_code: 200,
                            status_txt: "OK"
                        }
                    });

            const expectedActions = [ { type: types.GET_URL, payload: returnData } ];

            return store.dispatch(actions.fetchLongUrl(data)).then(() => {
                // return of async items
                expect(store.getActions()).to.deep.equal(expectedActions);
            });

        });

    });

});