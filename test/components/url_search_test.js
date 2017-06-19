import { renderComponent , expect } from '../test_helper';
import UrlSearch from '../../src/components/url_search';

describe('UrlSearch' , () => {
    let component;

    beforeEach(() => {
        component = renderComponent(UrlSearch);
    });

    it('renders to screen', () => {
        expect(component).to.exist;
    });

    it('renders input and button', () => {
        expect(component.find('input')).to.exist;
        expect(component.find('button')).to.exist;
    });

    it('disables button if input is empty', () => {
        expect(component.find('button').attr('disabled')).to.equal('disabled');
    });

    it('disables button if input value is not valid url', () => {
        component.find('input').val('aslsdaflfas').simulate('change');
        expect(component.find('button').attr('disabled')).to.equal('disabled');
    });

    it('enables button if input is valid url', () => {
        component.find('input').val('http://www.example.com').simulate('change');
        expect(component.find('button').attr('disabled')).to.equal(undefined);
    });

    it('renders default text if error prop is empty', () => {
        let props = {
            error: null
        };
        let state = {};
        component = renderComponent(UrlSearch, props, state);
        expect(component.find('p')).to.contain('Please enter a url to shorten, or a bitly link to expand.');

    });

    it('renders error message if error prop is set', () => {
        let props = {
            error: 'ERROR: Test Error Message'
        };
        let state = {};
        component = renderComponent(UrlSearch, props, state);
        expect(component.find('p')).to.contain('ERROR: Test Error Message');

    });
});