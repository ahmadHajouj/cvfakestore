import React from 'react';
import FeatureBlock from './Featureblock';
import {  useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { addInfo, getOneItem } from '../service/itemService';
// import {  Button, Form } from 'react-bootstrap';


const ItemPage = () => {
    const location = useLocation();
    const [infoClass, setInfoClass] = React.useState('grid grid--1x2 grid--1x1 add-not-clicked');
    const [addInfoClass, setAddInfoClass] = React.useState('add-btn');
    const [item, setItem] = React.useState(location.state.item );
    const [value, setValue] =React.useState('');
    
    console.log(location.state.isAdmin)

    async function handleAddInfo(e){
        e.preventDefault()
        await addInfo(item, {info:value});
        const { data:newItem } = await getOneItem(item)


        setInfoClass(infoClass === 'grid grid--1x2 grid--1x1 add-not-clicked' ? 'grid grid--1x2 grid--1x1' : 'grid grid--1x2 grid--1x1 add-not-clicked')
        setAddInfoClass(addInfoClass === 'add-btn' ? 'add-btn add-btn-clicked' : 'add-btn');
        setItem(newItem);
        setValue('');
        
    }
    
    function handeleValueChange({target:input}){
        setValue( input.value );
    }

    function info(){
        try{
            return [...item.info];
        }catch{
            return [];
        }

    }
    
    return (
        <div className='block'>

                <FeatureBlock.Item data={location.state.item}/>
                <div>{info().map(i => (<p key={i}>{i}</p>))}</div>     

                {location.state.isAdmin && (<React.Fragment>
                    <Form className={infoClass}
                        onSubmit={handleAddInfo}
                    >
                        <Form.Control className='mb-3' type='text' placeholder='the new info' as='textarea'
                            name='value' value={value} onChange={handeleValueChange}
                        />
                        <Button variant='success' onClick={handleAddInfo} className='btn-form'>submit</Button>
                    </Form>
                    <Button variant='success'
                    onClick={async ()=>{
                        setInfoClass(infoClass === 'grid grid--1x2 grid--1x1 add-not-clicked' ? 'grid grid--1x2 grid--1x1' : 'grid grid--1x2 grid--1x1 add-not-clicked')
                        setAddInfoClass(addInfoClass === 'add-btn' ? 'add-btn add-btn-clicked' : 'add-btn');
                        await addInfo(item,'hi');
                    }}
                    className={addInfoClass}
                    >add info</Button>
                </React.Fragment>)} 
            </div>
        );
    
}

export default ItemPage;