import React, { Component } from 'react';

import Imagebar from './Imagebar';

class Right extends Component {
    render() {
        const {name, description} = this.props;

        return (
            
            <article className="grid grid--1x2 grid--1x1 feature">
                <div className="feature__content">
                    <h3 className="feature__heading">{ name || `Lorem, ipsum dolor.`}</h3>
                    <p>{ description ||`Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis velit, quasi odit odio neque ad iure. Molestiae explicabo distinctio natus.`}
                    </p>
                </div>
                <div>
                    <div  className='feature-image'/>
                </div>
            </article>
        );
    }
}

class Left extends Component {
    render() {
        const {name, description} = this.props;
        return (
            <article className="grid grid--1x2 grid--1x1 feature">
                <div>
                    <div  className='feature-image'/>
                </div>
                <div className="feature__content">
                    <h3 className="feature__heading">{ name || `Lorem, ipsum dolor.`}</h3>
                    <p>{ description ||`Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis velit, quasi odit odio neque ad iure. Molestiae explicabo distinctio natus.`}
                    </p>
                </div>
            </article>
        );
    }
}

class Item extends Component {
    render() {
        const {name, description} = this.props.data;
        return (
            <article className="grid grid--1x2 grid--1x1 feature">
                <div>
                    <Imagebar  className='feature-image'
                        imgbar1={this.props.data}
                        imgbar2={this.props.data}
                        imgbar3={this.props.data}
                    />
                </div>
                <div className="feature__content">
                    <h3 className="feature__heading">{ name || `Lorem, ipsum dolor.`}</h3>
                    <p>{ description ||`Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis velit, quasi odit odio neque ad iure. Molestiae explicabo distinctio natus.`}
                    </p>
                </div>
            </article>
        );
    }
}

const FeatureBlock = {
    Right,
    Left,
    Item
};

export default FeatureBlock;