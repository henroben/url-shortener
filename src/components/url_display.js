import React, { Component } from 'react';

export default class UrlDisplay extends Component {

    copyToClipboard(text) {
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", text);
            this.refs.urlresult.select()
        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
                this.refs.urlresult.select()
            }
        }
    }

    renderResult(result, loading) {
        if(result !== null && result !== undefined && loading === false) {
            return (
                <div className="input-group results" >
                    <input className="form-control"
                           type="text"
                           value={result}
                           ref="urlresult"
                           readOnly="readOnly"
                           onFocus={()=>{this.refs.urlresult.select()}}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.copyToClipboard.bind(this, result)}>
                            <i className="fa fa-clipboard"></i> Copy
                        </button>
                    </span>
                </div>
            );
        } else if (loading === true) {
            return <div className="loader">Loading...</div>
        }
        else {
            return null;
        }
    }
    render() {
        return (
            <div>
                {this.renderResult(this.props.result, this.props.loading)}
            </div>
        );
    }
}