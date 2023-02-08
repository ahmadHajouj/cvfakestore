import { isNumber } from 'lodash';
import React from 'react';
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {CartContext}  from '../contaxt/CartContext';

function Item (props) {

    const {  id, name, description, pic, price, rating } = props;
    
    const isForSell = isNumber(price);

    return (            
        <CartContext.Consumer>
            {({  addItem }) => (
                    <Card as='div' className='item-card'>
                    <Card.Img
                    as='div'
                    variant="top" src={pic} className='main-look card-img'
                    
                    />
                    <Card.Body className='card-body'>
                        <Card.Title>
                            {name}
                        </Card.Title>
                        <Card.Text className='card-text' >
                            {description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Container className='card-btns'>
                            <Col className='justify-content-md-center'>
                                <Row xs lg='4' className='first-col'>{price} {isForSell ?  '$' : ''}</Row>
                                <Row md="auto" className='second-col'>
                                    { isForSell ? <Button 
                                        variant="success" 
                                        className='card-btn'
                                        as={Link} 
                                        to='/itempage' 
                                        state={{from: '/shop', item: props }}
                                        >Show
                                    </Button>
                                    :
                                    <div className='card-rating'>{rating}</div>
                                    }
                                </Row>
                                <Row xs lg='3' className='third-col'>
                                    {   isForSell ? 
                                        <Button variant="success" className='card-btn' onClick={() => addItem(id)}>Buy</Button> 
                                        :
                                        <Button 
                                        variant="success" 
                                        className='card-btn'
                                        as={Link} 
                                        to='/itempage' 
                                        state={{from: '/shop', item: props }}
                                        >Show
                                    </Button>
                                    }
                                </Row>
                            </Col>
                        </Container>                        
                    </Card.Footer>
                    </Card>
                )}
        </CartContext.Consumer>
        );

}



export default Item;