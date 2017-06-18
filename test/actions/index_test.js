import { configureMockStore, expect } from '../test_helper';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions' , () => {

    describe('fetchShortUrl', () => {

        let data = 'http%3A%2F%2Fgoogle.com%2F';
        let store = mockStore({
            convertedUrl: {
                loading: false,
                shorturl: null,
                longurl: null
            }
        });

        describe('LOADING', () => {
            it('has correct type', () => {
                store.dispatch(actions.fetchShortUrl(data));
                let res = store.getActions();
                expect(res[0].type).to.equal('LOADING');
            });
            it('has correct payload', () => {
                store.dispatch(actions.fetchShortUrl(data));
                let res = store.getActions();
                expect(res[0].payload).to.equal(true);
            });
        });

        describe('GET_SHORT_URL', () => {



        });

    });

});