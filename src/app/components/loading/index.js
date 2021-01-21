import React, { Component } from 'react';
import './index.scss';

import { Spin } from 'components/ui';

class Loading extends Component {
    render() {
        return (
            <div className="containers-loading">
                <Spin size="large" tip="Loading..." />
            </div>
            
        );
    }
}

export default Loading;
