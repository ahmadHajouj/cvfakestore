import React, { Component } from 'react';
import MobileShop from './mobileShop';
import BigscreenShop from './bigscreenShop';
class Shop extends Component {


    render() {
        return (
            <div>

                <div className='for-big-screen'>
                    <BigscreenShop className='for-big-screen'/>
                </div> 
                <div className='for-small-screen'>
                    <MobileShop className='for-small-screen'/>
                </div>
            </div>
        );
    }
}

export default Shop;