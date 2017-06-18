import { renderComponent , expect } from '../test_helper';
import UrlDisplay from '../../src/components/url_display';

describe('UrlDisplay' , () => {
    let component;

    beforeEach(() => {
        component = renderComponent(UrlDisplay);
    });

    it('renders to screen', () => {
        expect(component).to.exist;
    });
    it('renders empty div with no props passed', () => {
        expect(component).to.contain('');
    });
    it('renders empty div if props { loading: false } and { result: null }', () => {
        expect(component).to.contain('');
    });
    it('renders loading spinner if props { loading: true } and { result: null }', () => {
        let props = {
            result: null,
            loading: true
        };
        let state = {};
        component = renderComponent(UrlDisplay, props, state);
        expect(component.find('.loader')).to.exist;

    });
    it('renders input and button if props { loading: false } and result is !null', () => {
        let props = {
            result: 'example.com',
            loading: false
        };
        let state = {};
        component = renderComponent(UrlDisplay, props, state);
        expect(component.find('input')).to.exist;
        expect(component.find('button')).to.exist;
    });
});