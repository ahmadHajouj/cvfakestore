import React, { Component } from 'react';
import NavBar from './components/NavBar';
import auth from './service/authService';
// import { getUserCart } from './service/cartsService';
import {getUser} from './service/userService'
// import ItemPage from './components/ItemPage';
//import './App.css';


class App extends Component {

  state = {};

  async componentDidMount() {
    let user = auth.getCurrentUser();
    try
    {
      user = await getUser(user);
      //const { data : cart } = await getUserCart({ userId : user._id });
      this.setState({ user : user.data });
    }catch (e){}
    
  }

  render() {

    return (
      <div >
        <NavBar user={this.state.user} cart={this.state.cart}/>
      </div>
    );
  }
}

export default App;