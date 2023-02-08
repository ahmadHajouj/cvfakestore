import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';



class Imagebar extends Component {
    render() {

        const { imgbar1, imgbar2, imgbar3 } = this.props;
        return (
            <Carousel autoPlay showThumbs={false} infiniteLoop > 
                <div className='image-bar' >
                    <h3>{imgbar1.name || "First one"}</h3>
                    <p>{imgbar1.description || "alot of word to discripe the image in the back"}</p>
                </div>                
                <div className='image-bar' >
                    <h3>{imgbar2.name || 'Seccond one'}</h3>
                    <p>{imgbar2.description || "alot of word to discripe the image in the back"}</p>
                </div>                
                <div className='image-bar' >
                    <h3>{imgbar3.name || "Third one"}</h3>
                    <p>{imgbar3.description || 'alot of word to discripe the image in the back'}</p>
                </div>                
            </Carousel>
        );
    }
}

export default Imagebar;