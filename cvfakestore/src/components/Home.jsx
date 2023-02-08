import React, { Component } from 'react';
import FeatureBlock from './Featureblock';
import Imagebar from './Imagebar';
import { getElements } from './../service/homeService';
import { getItem } from './../service/itemService';



class Home extends Component {

    state = {
        home : [],
        items : []
    }


    async componentDidMount(){
        const { data : elements } = await getElements();
        const home = [...elements];

        const { data : allItem } = await getItem();
        const items = [...allItem];

        this.setState({ home, items });

    }

    render() {
        const def = i => {
            const item = this.state.home.find(ii => ii.name === i );
            if(item){
                const theitem = this.state.items.find(ii => ii.id === item.itemId);
                if(theitem) return theitem;
            }
            return { name:'',description : '' };
        }
        return (
            <div>
                <Imagebar
                    imgbar1={def('imgbar1')}
                    imgbar2={def('imgbar2')}
                    imgbar3={def('imgbar3')}
                />
                <div className='block'>
                    <FeatureBlock.Right name={def('feature1').name} description={def('feature1').description} />
                    <FeatureBlock.Left name={def('feature2').name} description={def('feature2').description} />
                </div>
            </div>

        );
    }
}

export default Home;
