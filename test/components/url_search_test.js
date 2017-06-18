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
});