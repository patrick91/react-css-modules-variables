import React from 'react';

import Packer from './Packer';

import debounce from '@f/debounce';


class Grid extends React.Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired,
    }

    constructor() {
        super();

        // TODO: doesn't have a nice effect when resizing
        this.onResize = debounce(this.onResize.bind(this), 50);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);

        // TODO: when props changes
        this.children = this._container.childNodes;
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        this.calculate();
        this.apply();
    }

    calculate() {
        this.bins = [];

        this.containerHeight = 0;

        this.children.forEach((box) => {
            const b = box.getBoundingClientRect();

            this.bins.push({
                el: box,
                w: b.width,
                h: b.height,
            });
        });

        // TODO: use math.infinity for the height?
        const pack = new Packer(this._container.getBoundingClientRect().width, 9999);

        pack.fit(this.bins);
    }

    apply() {
        console.log('apply', this.bins);

        this.bins.forEach(this.applySingle.bind(this));

        this._container.style.height = `${this.containerHeight}px`;
    }

    applySingle(bin) {
        const { el, fit } = bin;

        if (!el) {
            return;
        }

        el.style.position = 'absolute';
        el.style.top = `${fit.y}px`;
        el.style.left = `${fit.x}px`;

        const height = el.getBoundingClientRect().height;
        const tmpHeight = fit.y + height;

        if (tmpHeight > this.containerHeight) {
            this.containerHeight = tmpHeight;
        }
    }

    render() {
        return <div className={this.props.className} ref={(c) => this._container = c}>
            {this.props.children}
        </div>;
    }
}


export default Grid;
