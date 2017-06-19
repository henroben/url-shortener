"use strict";
import { expect } from '../test_helper';
import reducers from './../../src/reducers';
import * as types from './../../src/actions/types';

describe("Reducers" , () => {

    describe("url reducer", () => {

        it("should return initial state", () => {

            let state = { convertedUrl: { loading: false, url: null, error: null } };
            expect(reducers(undefined, {})).to.deep.equal(state);

        });

        it("should handle LOADING", () => {

            expect(reducers({}, {
                type: types.LOADING,
                payload: true
            })).to.deep.equal({
                convertedUrl: {
                    loading: true,
                    url: null,
                    error: null
                }
            });

        });

        it("should handle GET_URL", () => {

            expect(reducers({}, {
                type: types.GET_URL,
                payload: 'http://www.google.co.uk'
            })).to.deep.equal({
                convertedUrl: {
                    loading: false,
                    url: 'http://www.google.co.uk',
                    error: null
                }
            });

        });

        it("should handle ERROR", () => {

            expect(reducers({}, {
                type: types.ERROR,
                payload: 'Example error message'
            })).to.deep.equal({
                convertedUrl: {
                    loading: false,
                    url: null,
                    error: 'Example error message'
                }
            });

        });

    });

});