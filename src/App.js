import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
  this.state = {
    inventory : [],

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

updateState = async () =>
{
await fetch('/api/index').then(res=>
    res.json()).then(data=> this.setState({inventory: [...data]})
  ).then(this.setState(
    {
      displayOne: false,
      addItem : false,
      newItem : {  
      name: 'name',
      description: 'description',
      pic:'piture url'}
    }))
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
  }).then(res=>{res.json()}).then(this.updateState())
}

deleteItem = (idx) =>
{
  return fetch(`/api/delete/${idx}`, {
    method: 'delete',
  }).then(this.updateState())
}

updateItem = () =>
{
  return fetch(`/api/update/${this.state.updateItem}`, {
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
      {this.state.inventory.length !== 0 ? 
      <div> 
      {this.state.displayOne ? 
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
    </div>
    :
    <h2>please add an item</h2>
    }
  
  {
    this.state.addItem ? 
      <form>
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
        <div  className="buttonStyling" onClick={this.addItem}>Submit</div>
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
