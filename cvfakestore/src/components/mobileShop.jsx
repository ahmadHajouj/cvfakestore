import React, { Component } from 'react';
import {  Container, Row, Col } from "react-bootstrap";
import Item from './mobileItem';
import Filter from './Filter';
import Pagination from "./common/pagination";
import { getItem } from '../service/itemService';
import { getTypes } from '../service/typesService';
import { paginate } from "../utils/paginate";

class MobileShop extends Component {
    constructor(props){
        super(props)
        this.state = {
            items:[],
            data: [],
            types: [],
            type: 'all',
            currentPage: 1,
            pageSize: 6,
        }

        this.handleFilter = this.handleFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.getPageData = this.getPageData.bind(this);
    }

    
    async componentDidMount(){
        const { data:alldata } = await getItem();
        const  { data: alltypes}  = await getTypes();
        const types = [{ id: -1, name: 'All'}, ...alltypes];
        const data = alldata.filter(i => !i.notForShop);

        //console.log( 'the data from db is ' + alltypes);

        this.setState({ items: data, data  , types })
    }
    

    handleFilter(type){
        
        let items = type.name === 'All' ? [...this.state.items] : this.state.items.filter( i => i.type === type.name);

        this.setState({ data: items })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
      };

    getPageData = () => paginate(this.state.data, this.state.currentPage, this.state.pageSize);

    render() {
        return (
            <React.Fragment>
                <Container className='justify-content-md-center block grid-block'>
                <Row />
                    <Row xs='auto' className="justify-content-md-center flex">
                            <Row className='filter-block'>
                                <Filter types={this.state.types} onFilter={this.handleFilter}/>
                            </Row>
                            <Row>
                                <Container className='grid grid--1x3 grid--1x2 grid--1x1 shop-block'>
                                
                                        { this.getPageData().map(item =>
                                        // {if (this.state.type === 'all' || item.type === this.state.type)
                                        (<Col key={item.id}>
                                            <Item key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                pic={item.pic}
                                                description={item.description}
                                                price={item.price}
                                                rating={item.rating}
                                                _id={item._id}
                                                info={item.info}
                                                item={item}
                                                />
                                        </Col>))}
                                            <Col>
                                            <Pagination
                                                itemsCount={this.state.data.length}
                                                pageSize={this.state.pageSize}
                                                currentPage={this.state.currentPage}
                                                onPageChange={this.handlePageChange}
                                />
                                            </Col>
                                </Container>
                            </Row>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default MobileShop;