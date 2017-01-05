import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles';


class Button extends React.Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired,
    }

    render() {
        return <div styleName="link">
            {this.props.children}
        </div>;
    }
}

export default CSSModules(styles)(Button);
