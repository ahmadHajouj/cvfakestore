import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getTypes, postType } from './../service/typesService';
import { getItem, postItem } from './../service/itemService';
import { getElements, setElement } from './../service/homeService';

class Settings extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            types : [],
            type : { id : '' , name : "" },
            item :  { name : "" , type : "", pic : "", description : "" , price : "" },
            home : [],
            homeElement:{ name : '', itemId: ''},
            isNotType: true,
            isNotItem: true
        }
        
        this.handeleTypeChange = this.handeleTypeChange.bind(this)
        this.handeleItemChange = this.handeleItemChange.bind(this)
        this.handeleHomeChange = this.handeleHomeChange.bind(this)

        this.handeleTypeSubmit = this.handeleTypeSubmit.bind(this)
        this.handeleItemSubmit = this.handeleItemSubmit.bind(this)
    }

    async componentDidMount(){
        const { data : atypes } = await getTypes();
        const types = [...atypes]

        const { data : aitems } = await getItem();
        const items = [...aitems]

        const { data : elements } = await getElements();
        const home = [...elements]


        this.setState({ items,  types, home });
    }

    handeleHomeChange= async e => {
        const elements = [...this.state.home];
        let homeElement = { name: e.target.name, itemId: e.target.value};

        let index = elements.findIndex( i => i.name === e.target.name);
        console.log(index);
        if(-1<index) {
            elements[index].itemId = e.target.value;
            homeElement = elements[index];
        }

        await setElement(homeElement);
        const { data : home } = await getElements();

        this.setState({ home, homeElement})

        console.log( home );
    }


    handeleTypeChange( { currentTarget: input }){
        const type = { ...this.state.type };
        type[input.name] = input.value;
        const isNotType = type.name === '' ? true : false;

        this.setState({ type , isNotType });
    }

    handeleItemChange( { currentTarget: input }){
        const item = { ...this.state.item };
        if(!item.id) item.id = this.state.items.length -1;
        item[input.name] = input.value;

        let isNotItem = true;
        if(this.state.types.length >= 0) {
            if (item.name !== '') isNotItem = item.type === '' ? true : false;
        }

        this.setState({ item , isNotItem });
        console.log( this.state.item )
    }

    handeleTypeSubmit = async e => {
        e.preventDefault();
        await postType( this.state.types.length , this.state.type.name );

        const { data : atypes } = await getTypes();
        const types = [...atypes]
        
        this.setState({ types, type: {name : ''} });
    }

    handeleItemSubmit = async e => {
        e.preventDefault();
        await postItem(this.state.item);

        const { data : aitems } = await getItem();
        const items = [...aitems]

        this.setState({ items, item : { id : '' , name : "" , type : "", pic : "", description : "" , price : "" }})
    }


    render() {
        const def = i => {
            const item = this.state.home.find(ii => ii.name === i );
            if(item){
                const theitem = this.state.items.find(ii => ii.id === item.itemId);
                if(theitem) return theitem.name;
            }
        }

        return (
            <div>
                <div className='block grid grid-block grid--1x3 grid--1x1'>
                    <div className='settings-select'>
                        <h4>pic 1 of imagebar</h4>
                        <select onChange={this.handeleHomeChange} name='imgbar1' value=''>
                            <option value='' disabled>{def('imgbar1') || '' }</option>
                        {this.state.items.map( item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                        </select>
                        </div>
                    <div className='settings-select'>
                        <h4>pic 2 of imagebar</h4>
                        <select onChange={this.handeleHomeChange} name='imgbar2' value=''>
                        <option value='' disabled>{def('imgbar2') || '' }</option>
                            {this.state.items.map( item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        </div>
                        <div className='settings-select'>
                        <h4>pic 3 of imagebar</h4>
                        <select onChange={this.handeleHomeChange} name='imgbar3' value=''>
                        <option value='' disabled>{def('imgbar3') || '' }</option>
                            {this.state.items.map( item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        </div>
                        <div className='settings-select'>
                        <h4>feature 1</h4>
                        <select onChange={this.handeleHomeChange} name='feature1' value=''>
                        <option value='' disabled>{def('feature1') || '' }</option>
                            {this.state.items.map( item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        </div>
                        <div className='settings-select'>
                        <h4>feature 2</h4>
                        <select onChange={this.handeleHomeChange} name='feature2' value=''>
                        <option value='' disabled>{def('feature2') || '' }</option>
                            {this.state.items.map( item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        </div>
                </div>
                <Form className='main-form settings-form' onSubmit={this.handeleTypeSubmit}>
                    <h3>Add a type</h3>
                    <Form.Control 
                        className="mb-2 textbox-form" 
                        placeholder="Name"
                        name='name'
                        value={this.state.type.name}
                        onChange={this.handeleTypeChange} 
                    />
                    <Button variant='success' type='submit' disabled={this.state.isNotType}>submit</Button>
                </Form>
                <Form className='main-form settings-form' onSubmit={this.handeleItemSubmit}>
                    <h3>Add an item</h3>
                    <Form.Control className="mb-3 textbox-form" placeholder="Name" 
                        name='name'
                        value={this.state.item.name}
                        onChange={this.handeleItemChange} 
                    />
                    <Form.Select className="mb-3 textbox-form" placeholder='type' 
                        name='type'
                        value={this.state.item.type}
                        onChange={this.handeleItemChange} 
                    >
                        <option value='' disabled>type</option>
                        {this.state.types.map( type => (
                            <option key={type.id}>{type.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Control className="mb-3 textbox-form" placeholder='pic'
                        name='pic'
                        value={this.state.item.pic}
                        onChange={this.handeleItemChange} 
                    /> 
                    <Form.Control className="mb-3 textbox-form" placeholder='price' 
                        name='price'
                        value={this.state.item.price}
                        onChange={this.handeleItemChange} 
                    /> 
                    <Form.Control className="mb-3 textbox-form" as='textarea' placeholder='description' 
                        name='description'
                        value={this.state.item.description}
                        onChange={this.handeleItemChange} 
                    /> 
                    <Button variant='success' type='submit' disabled={this.state.isNotItem}>submit</Button>

                </Form>
            </div>
        );
    }
}

export default Settings;