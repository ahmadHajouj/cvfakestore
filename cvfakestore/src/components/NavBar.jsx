import React, { Component } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from './Home';
import Shop from './Shop';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import ItemPage from './ItemPage';
import Logout from './logout';
import Settings from './settings';
import { CartContext } from '../contaxt/CartContext';
import { getItem } from './../service/itemService';
import { addToCart, getUserCart, removeFromCart } from './../service/cartsService';
import { getCurrentUser } from '../service/authService';
import { getUser } from '../service/userService';
// import { addToCart, getFromCart } from './../service/cartService';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            cart:{},
            addItem: this.addItem ,
            removeItem: this.removeItem,
            countTotal: this.countTotal,
            navElement: "me-auto nav-ele",
            isAdmin: false
        }
        
        this.handleNavbar = this.handleNavbar.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

     componentDidMount = async () => {
        let data = [...this.state.data]
        let cart = {...this.state.cart}
        let isAdmin = this.state.isAdmin
        try{
            if(getCurrentUser()){
                const {data:theCart} = await getUserCart({userId : getCurrentUser()._id})
                const {data:user} = await getUser(getCurrentUser());
                
                cart = {...theCart};
                data = [...theCart.cart];
                isAdmin = user.isAdmin 
            }
        }catch{}
        
        this.setState({ data, cart, isAdmin });
    }

    addItem = async (id) => {
        const { data : items } = await getItem();
        let data = [...this.state.data];
        let cart = {...this.state.cart};
        if(this.props.user) {
            try{
                if (!data.find(i => i.id === id )) {
                    await addToCart({
                        userId: getCurrentUser()._id,
                        item: items.find(i => i.id === id )});

                        const {data : r} = await getUserCart({userId: getCurrentUser()._id});
                        cart = {...r};
                        data = [...r.cart];
                    }
                }catch(ex){}
            } else {
                if (!data.find(i => i.id === id )) data.push(items.find(i => i.id === id ));
                cart.cart = [...data];
            }
        this.setState({ data, cart });
    };

    removeItem =  async (id) => {
        let data = [...this.state.data];
        let cart = {...this.state.cart};
        const item = data.find( i => i.id === id );
        const index = data.indexOf(item);

        if(this.props.user){
            if (index > -1 )await removeFromCart({
                    userId: getCurrentUser()._id,
                    item:item
                });
            const {data:newCart} = await getUserCart({userId:getCurrentUser()._id})
            cart = {...newCart};
            data = [...cart.cart]
            
        } else {
            if (index > -1 ) data.splice(index, 1);
            cart.cart = [...data];
        }

        this.setState({ data, cart });
    }

    countTotal = () =>{
        const  items  = this.state.data;
        let c = 0;
        for (let i = 0; i < items.length ; i++) c = c + items[i].price;
        return c;
    }
    
    handleNavbar(){
        let navElement = this.state.navElement;
        navElement = this.state.navElement === "me-auto nav-ele" ? "me-auto nav-ele1": "me-auto nav-ele";

        this.setState( { navElement });
    }

    isAdmin(){
        const { user } = this.props
        
        try{
            if(user.isAdmin) return true;
        }catch (ex){
            return false;
        }
        return false;
    }
    render(){
        const { user } = this.props
        function isAdmin(){
            try{
                if(user.isAdmin) return true;
            }catch (ex){
                return false;
            }
            return false;
        }
        return (     
            <Router>
                <>
                    <Navbar variant="dark">
                        <Container className='main-look'>
                        <Navbar.Brand key='home' as={NavLink} to='/'>FakeStore</Navbar.Brand>
                        <Nav className={this.state.navElement}>
                            <Nav.Link key='shop' as={Link} to='/shop'>Shop</Nav.Link>
                            {!user && (
                                <React.Fragment>
                                    <Nav.Link key='register' as={Link} to='/register'>Register</Nav.Link>
                                    <Nav.Link key='login' as={Link} to='/login'>Login</Nav.Link>
                                </React.Fragment>
                                )}
                            {user && (<React.Fragment>
                                            <Nav.Link key='register' to='/register'>{user.username}</Nav.Link>
                                            <Nav.Link key='login' as={Link} to='/logout'>Logout</Nav.Link>
                                     </React.Fragment>
                                     )}
                            {isAdmin() && (<Nav.Link key='settings' as={Link} to='/settings'>Settings</Nav.Link>)}
                            <Nav.Link key='cart' as={Link} to='/cart'>Cart</Nav.Link>
                        </Nav>
                        <Button className='nav-btn' variant='success' onClick={() => this.handleNavbar()}>+</Button>
                        </Container>
                    </Navbar>
                </>
                <>
                    <CartContext.Provider value={this.state}>
                        <Routes>
                            <Route path='/settings' element={<Settings/>}></Route>
                            <Route path='/logout' element={<Logout/>}></Route>
                            <Route path='/itempage' element={<ItemPage/>}></Route>
                            <Route path='/cart' element={<Cart/>}></Route>
                            <Route path='/shop' element={<Shop/> }></Route>
                            <Route path='/login' element={<Login/>}></Route>
                            <Route path='/register' element={<Register/>}></Route>
                            <Route path='/' element={<Home/>}></Route>
                            
                        </Routes>
                    </CartContext.Provider>
                </>
            </Router>
    );}
    
}

export default NavBar;