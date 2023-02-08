import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { CartContext } from '../contaxt/CartContext';
import { getCurrentUser } from '../service/authService';
import { getFromCart, getItemFromCart, removeFromCart } from './../service/cartService';
import { getUserCart, makeCart } from './../service/cartsService';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataInCart: [],
            cart:{}
        }

        this.countTotal = this.countTotal.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    async componentDidMount(){
        let data = [...this.state.dataInCart]
        let cart = {...this.state.cart}
        if(getCurrentUser() !== null){
            try
            {
                const { data : cart0 } = await getUserCart({ userId : getCurrentUser()._id });
                cart = {...cart0};
                data = [...cart0.cart];
        }catch(ex){
                const { data : newCart } = await makeCart({ userId : getCurrentUser()._id });
                cart = {...newCart}
                data = [...newCart.cart];
            }
        }
        this.setState({ dataInCart: data, cart });
    }
    

    countTotal () {
        const  items  = this.state.dataInCart;
        let c = 0;
        for (let i = 0; i < items.length ; i++) c = c + items[i].price;
        return c;
    }

    async handleRemove (item) {
        const { data } = await getItemFromCart(item); 

        if(data){
            try{
                console.log( await removeFromCart(item) ); 
            }catch (e){
                console.log('wrong in removing from DB')
            }
        }
        const { data : items } = await getFromCart();
        this.setState({ dataInCart: [...items ] });
    }

    render(){
        return (
            <CartContext.Consumer>
            { props => (

                    <div className='block'>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.data.map( r => (
                            <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{r.price}$</td>
                            <td><Button variant="danger" onClick={() => props.removeItem(r.id)}>REMOVE</Button></td>
                        </tr>
                        ))}
                        <tr>
                            <td>|</td>
                            <td>|</td>
                            <td>|</td>
                            <td>|</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Total</td>
                            <td>{props.countTotal()}$</td>
                            <td><Button variant="success">Pay</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </CartContext.Consumer>
        );
    }

}

export default Cart;

export function handleAdd(id){
    return Cart.handleAdd(id);
};