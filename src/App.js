import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
  this.state = {
    inventory : [{
      name: 'nme',
      description: 'description',
      pic:'piture url',
      _id :"fakj"
    },{
      name: 'ame',
      description: 'description',
      pic:'https://lh3.googleusercontent.com/CvAKWgolmhQzoAY5HkM2HGwTq4x4GARU0a2UiHn0Tt4AmuQDP1rSTR9z1rcN9VsdgE8beK2LBZTtaZiM5P2gDUkFHpZTiTGIzatHkwOfsLTQqI5cEgNCrQzPvEw5XFbAwKS2R32kTg=w851-h482-no',
      _id :"fakjga"
    },{
      name: 'nae',
      description: 'description',
      pic:'pitre url',
      _id :"fakjafh"
    }],

    displayOne: false,
    addItem : false,
    updateItem : false,
    
    newItem:{
      name: 'name',
      description: 'description',
      pic:'piture url'
    },
  };
  }

componentDidMount = () =>
{
this.updateState()
}

updateState = () =>
{
  const options = {
    method: 'GET'
    }
  return fetch('/api/', options).then(res=>
    res.text()).then(data=> console.log(data)
      //this.setState({inventory: JSON.stringify(data)})
  )
}

show1 = (idx) => 
{
this.setState(
  {
    displayOne: idx
  })
}

showAll =()=> 
{
this.setState(
  {
    displayOne: false
  })
}

handleChange = (e)=>
{
  const newItem = {...this.state.newItem};
  newItem[e.target.name] = e.target.value;
  this.setState({
    newItem : newItem
  })
}

toggleAdd =()=>
{
  let addItem = !this.state.addItem;
  this.setState(
    {
      addItem,
      updateItem : false
    })
}

toggleUpdate = (modelId, idx) =>
{
  this.setState(
    {
      addItem : !this.state.addItem,
      updateItem : modelId,
      newItem : this.state.inventory[idx]
    })
}

addItem = ()=>
{
  return fetch(`/api/add`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(this.state.newItem)
  }).then(res=>{res.json()}).then(
    this.setState(
      {
        addItem : false,
        newItem : {     
        name: 'name',
        description: 'description',
        pic:'piture url'}
      })
  ).then(this.updateState())
}

deleteItem = (idx) =>
{
  return fetch(`/api/delete/${idx}`, {
    method: 'POST',
    body: '',
    headers: new Headers({'Content-Type': 'application/json'}),
  }).then(res=>{res.json()}).then(
    this.setState(
      {
        addItem : false,
        newItem : {  
        name: 'name',
        description: 'description',
        pic:'piture url'}
      })
  ).then(this.updateState())
}

updateItem = () =>
{
  
  return fetch(`/api/update/${this.state.toggleUpdate}`, {
    method: 'POST',
    body: JSON.stringify(this.state.newItem),
    headers: new Headers({'Content-Type': 'application/json'}),
  }).then(res=>{res.json()}).then(
    this.setState(
      {
        addItem : false,
        newItem : {}
      })
  ).then(this.updateState())
}
render()
{
  return (
    <div className="App">
      {
      this.state.displayOne ? 
        <div>
        <h1 onClick={this.showAll}>{this.state.inventory[this.state.displayOne-1].name}</h1>
        <h3>{this.state.inventory[this.state.displayOne-1].description}</h3>
        <img src={this.state.inventory[this.state.displayOne-1].pic} alt='bad image url' height='auto' width='70%' />
        <div className="buttonStyling" onClick={()=>this.toggleUpdate(this.state.inventory[this.state.displayOne-1]._id, this.state.displayOne-1)}>update Item</div>          <div className="buttonStyling" onClick={()=>this.deleteItem(this.state.inventory[this.state.displayOne-1]._id)}>Delete</div>
        </div> 
      :
        this.state.inventory.map((item,idx)=>
        {
          return <div key={idx} onClick={()=>{this.show1(idx+1)}}>
            <h1>{item.name}</h1>
            <h3>{item.description}</h3>
            <img src={item.pic} alt='bad image url'  height='auto' width='90%'/>
          </div>
      })}
  
  {
    this.state.addItem ? 
      <form onSubmit={this.addItem}>
        <input 
          name="name"
          value={this.state.newItem.name}
          onChange={this.handleChange}
          required
        ></input>
      <br/>
        <input
          name="description"
          value={this.state.newItem.description}
          onChange={this.handleChange}
          required
        ></input> 
      <br/>
        <input
          name="pic"
          value={this.state.newItem.pic}
          onChange={this.handleChange}
          required
        ></input> 
      <br/>
      {
      this.state.updateItem ? 
        <div className="buttonStyling" onClick={this.updateItem}>update</div>
      :
        <div onClick={this.addItem} className="buttonStyling">Submit</div>
      }
      <div className="buttonStyling" onClick={this.toggleAdd}>Cancel</div>
    </form>
    :
    <div className="buttonStyling" onClick={this.toggleAdd}>Add Item</div>
    }
  </div>
  );
}
  
}
export default App;
