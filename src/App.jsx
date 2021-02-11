import React from 'react';
import firebase from './config/firebase.js'
// class App extends React.Component {
//   constructor()
//   {
//     super()
//     this.state = 
//     {
//       todos : [],
//       value : "",
//       new : ""
//     }
//   }
//   fun = ()=>
//   {
//     // this.state.todos.push(this.state.value);
//     // this.setState({
//     //   todos : this.state.todos,
//     //   value : this.state.value
//     // })
//     let obj = {
//       name: this.state.value,
//       edit:false
//     } 
//     firebase.database().ref("todo").push(obj);
//     this.setState({
//       todos: [...this.state.todos,obj],
//       value: ""
//     })
//   }
//   // fundel = ()=>
//   // {
//   //   this.setState({
//   //     todos : "",
//   //     value : ""
//   //   })
//   // }

//   delFun = (i)=>
//   {
//     this.state.todos.splice(i,1);
//     this.setState({
//       todos: this.state.todos,
//       value: this.state.value
//     })
//   }
// editFun = (i)=>
// {
//   this.state.todos[i].edit = true;
//   this.state.todos[i].name = this.state.new;
//   this.setState({
//     todos: this.state.todos,
//     value: this.state.value
//   })

// }
// updateFun = (i)=>
// {
//   this.state.todos[i].name = this.state.new;
//   this.setState({
//     todos: this.state.todos,
//     value: this.state.value
//   })
//   this.state.todos[i].edit = false;  
// }
//   render()
//   {

//     return(
//       <div>
//         <input value = {this.state.value} type = "text"  onChange = {(e)=> this.setState({value: e.target.value})}  placeholder = "Enter todo" id = "inp" />
//         <button onClick = {this.fun} >Add Button</button>
//         {/* <button onClick = {this.fundel} >delete all Button</button> */}
//         <ul>
//           {this.state.todos.map((item,index)=>
//           {
//             return <li key={index}>{item.edit? <input type="text" value = {item.name} placeholder = "Enter edition" onChange = {(e)=> this.state.new = e.target.value} />  : item.name}
//              <button onClick = {()=>this.delFun(index)} >delete Button</button>
//              {item.edit?  <button onClick = {()=> this.updateFun(index)} >Update Button</button> :  <button onClick = {()=> this.editFun(index)} >Edit Button</button>}
            
//              </li>
                   
//           })}
//         </ul>
//       </div>
//     )
//   }
// }


class App extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      todo :[],
      val :""
    }
  }
  addTodo = ()=>
  {
    let obj = {
      name: this.state.val
    }
   
    firebase.database().ref('todo').push(obj);
  }

  componentDidMount()
  {
    firebase.database().ref("todo").on('child_added',(data)=>
    {
      let obj ={
        name:data.val().name,
        id:data.key
      }
      this.setState({
        todo:[...this.state.todo,obj]
      })
  })
}
  deleteTodo = (index,value)=>
  {
    this.state.todo.splice(index,1);
    this.setState({
      todo: this.state.todo
    })
    firebase.database().ref('todo').child(value.id).remove();
  }
editTodo = (i,v)=>
{
  let edit = prompt("Enter your edition:");
  let obj = {
    name: edit,
    id: v.id
  }

  this.state.todo[i] = obj;
  this.setState({
    todo: this.state.todo
  })
  firebase.database().ref("todo").child(v.id).set(obj);
}
  render()
  {

    return(
      <div>
       <input value = {this.state.value} type="text" placeholder="Enter Todo" onChange = {(e)=> this.state.val = e.target.value} />
       <button onClick = {this.addTodo}>ADD TODO</button>  
       <ul>
         {this.state.todo.map((v,i)=>
         {
           return(
             <li key={i}>
               {v.name}
               <button onClick = {()=>this.deleteTodo(i,v)}>DELETE</button> 
               <button onClick = {()=>this.editTodo(i,v)}>EDIT</button>
               </li>
           )
         })}
       </ul>
      
      </div>
    )
  }
}

























export default App;
