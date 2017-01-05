import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles';

import Button from '../button';


class Hero extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
    }

    render() {
        const { title, image, className } = this.props;

        return <div styleName="wrapper" style={{
            backgroundImage: `url(${image})`,
        }} className={className}>
            <div styleName="content">
                <h1 styleName="title">{title}</h1>

            </div>

            <div styleName='button-wrapper'>
                <Button>Hello world</Button>
            </div>
        </div>;
    }
}

export default CSSModules(styles)(Hero);
