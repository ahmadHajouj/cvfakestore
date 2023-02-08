const Items = [
    { id: 0, name: 'FakeStore Web App', description: 'A web app developed by the owner of this wepsit', type: 'app', pic: '', price: 10000 },
    { id: 1, name: 'The joker painting', description: 'A graffity painting of the batman arkham origens the joker on a pepar', type: 'art', pic: '', price: 150 },
    { id: 3, name: 'CS', description: `The owner has a bachelor's degree of Cmputer Science`, type: 'edu', pic: '', price: 'for show' },
    { id: 2, name: 'The Dethstrock painting', description: 'A graffity painting of Dethstrock on a pepar', type: 'art', pic: '', price: 200 },
    { id: 4, name: 'FakeStore Web App', description: 'A web app developed by the owner of this wepsit', type: 'app', pic: '', price: 10000 },
    { id: 5, name: 'The joker painting', description: 'A graffity painting of the batman arkham origens the joker on a pepar', type: 'art', pic: '', price: 150 },
    { id: 8, name: 'CS', description: `The owner has a bachelor's degree of Cmputer Science`, type: 'edu', pic: '', price: 'for show' },
    { id: 7, name: 'The Dethstrock painting', description: 'A graffity painting of Dethstrock on a pepar', type: 'art', pic: '', price: 200 },
]

const types = [];

export let result = Items.map(item => {
    let r = types.find( t => t === item.type) ;
    if (!r) types.push(item.type);
    return 0;
})



export function getItem(){
    return Items.filter(i => i);
}
export function getTypes(){
    return types.filter(t => t);
}
