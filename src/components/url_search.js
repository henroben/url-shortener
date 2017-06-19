import React, { Component } from 'react';
import * as Redux from 'react-redux';
import { isWebUri } from 'valid-url';

import {fetchShortUrl} from './../actions';

class UrlSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputStatus: true
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.checkInputUrl = this.checkInputUrl.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        // get url to shorten
        let url = this.refs.inputurl.value;
        // check is a valid url
        if (isWebUri(url)) {
            // uri encode
            url = encodeURI(url);
            this.props.fetchShortUrl(url);
        }
    }

    checkInputUrl() {
        let url = this.refs.inputurl.value;
        if (isWebUri(url)) {
            this.setState({inputStatus: false});
        } else {
            this.setState({inputStatus: true});
        }
    }

    displayMessage(msg) {
        if(msg !== null) {
            return <p className="bg-warning">{msg}</p>;
        } else {
            return <p>Please enter a url to shorten, or a bitly link to expand.</p>;
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="">
                    {this.displayMessage(this.props.error)}
                </div>
                <div className="input-group">
                    <input className="form-control"
                           placeholder="http://www.example.com"
                           ref="inputurl"
                           onChange={this.checkInputUrl}
                           onFocus={()=>{this.refs.inputurl.select()}}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" disabled={this.state.inputStatus}>
                            <i className="fa fa-sign-in"></i> Go
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}

export default Redux.connect(null, {fetchShortUrl})(UrlSearch);