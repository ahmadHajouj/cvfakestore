import React, { Component } from 'react';
import { ButtonGroup, Button, DropdownButton} from 'react-bootstrap';

class Filter extends Component {
    render() {
        const data = this.props.types ;
        return (
            <ButtonGroup vertical size='lg' className='mb-2' >

                <DropdownButton as={ButtonGroup} title='f' variant='success' className='btn-group f-btn' key='f'>
                    <ButtonGroup vertical size='lg' className='mb-2' >
                        { data.map( type => ( <Button variant='success' className='btn-group' key={type.id}
                        onClick={() => this.props.onFilter(type)}>{type.name}</Button>))}
                    </ButtonGroup >
                </DropdownButton>


                { data.map( type => ( <Button variant='success' className='btn-group all-btn' key={type.id}
                onClick={() => this.props.onFilter(type)}>{type.name}</Button>))}
            </ButtonGroup >
        );
    }
}

export default Filter;