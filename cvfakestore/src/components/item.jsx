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
            {({  addItem, isAdmin }) => (
                    <Card className='item-card'>
                    <Card.Img
                    as='div'
                    variant="top" src={pic} className='main-look card-img'
                    style={{
                        height: '7rem',
                        margin: 0
                    }}
                    />
                    <Card.Body>
                        <Card.Title>
                            {name}
                        </Card.Title>
                        <Card.Text className='card-text' >
                            {description}
                        </Card.Text>
                        <Container>
                            <Row className='justify-content-md-center'>
                                <Col xs lg='4' className='first-col'>{price} {isForSell ?  '$' : ''}</Col>
                                <Col md="auto" className='second-col'>
                                    { isForSell ? <Button 
                                        variant="success" 
                                        className='card-btn'
                                        as={Link} 
                                        to='/itempage' 
                                        state={{from: '/shop', item: props.item, isAdmin }}
                                        >Show
                                    </Button>
                                    :
                                    <div className='card-rating'>{rating}</div>
                                    }
                                </Col>
                                <Col xs lg='3' className='third-col'>
                                    {   isForSell ? 
                                        <Button variant="success" className='card-btn' onClick={() => addItem(id)}>Buy</Button> 
                                        :
                                        <Button 
                                        variant="success" 
                                        className='card-btn'
                                        as={Link} 
                                        to='/itempage' 
                                        state={{from: '/shop', item: props.item, isAdmin }}
                                        >Show
                                    </Button>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                    </Card>
                )}
        </CartContext.Consumer>
        );

}



export default Item;