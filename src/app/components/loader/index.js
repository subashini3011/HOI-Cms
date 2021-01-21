import './index.scss';

import React, { Component } from 'react';

class Loader extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
        }
    }

    render() {
        let domObj = [];
        // alert(this.props.error);
        
        this.props.error ?
            domObj.push(
                <div key="error">
                    Error! Please try again. 
                    {/* <button onClick={ this.props.retry }>Retry</button> */}
                </div>
            )
        : this.props.timedOut ?
            domObj.push(
                <div key="timeout">
                    Taking a long time... 
                    {/* <button onClick={ this.props.retry }>Retry</button> */}
                </div>
            )
        :this.props.pastDelay ?
            domObj.push( 
                <div key="delay">Loading...</div>
            )
        : domObj.push(null);

        return (
            <div> { domObj } </div>
        );
    }
}

export default Loader;
