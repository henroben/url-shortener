import React, { Component } from 'react';
import * as Redux from 'react-redux';

import UrlSearch from './url_search';
import UrlDisplay from './url_display';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-xs-hidden col-md-3"></div>
                <div className="col-xs-12 col-md-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4>URL Shortener / Expander <small>using bitly.com</small></h4>
                        </div>
                        <div className="panel-body">
                            <UrlSearch error={this.props.error} />
                            <UrlDisplay result={this.props.shorturl || this.props.longurl} loading={this.props.loading} />
                        </div>
                    </div>
                </div>
                <div className="col-xs-hidden col-md-3"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        shorturl: state.convertedUrl.shorturl,
        longurl: state.convertedUrl.longurl,
        loading: state.convertedUrl.loading,
        error: state.convertedUrl.error
    }
}
export default Redux.connect(mapStateToProps)(App);
