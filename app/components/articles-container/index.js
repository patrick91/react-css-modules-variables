import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles';

import Grid from './Grid';


class ArticlesContainer extends React.Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired,
    }

    render() {
        return <Grid className={this.props.styles.wrapper}>
            {this.props.children}
        </Grid>;
    }
}

export default CSSModules(styles)(ArticlesContainer);
