import React from 'react';
import '../App.css';

const FormTodo = ({addTodo}) => {
    
   let input;
    
   return (
    <div className="todo-header">
                <h1>todos</h1>
        <form id="add-form" autoComplete="off" onSubmit={(e) => {
          e.preventDefault();
          addTodo(input.value);
          input.value = '';
        }}>
            <span className="toggle-all" ></span>
            <input placeholder="What needs to be done?" type="text" id="todo-text" ref={node => {input = node;}}/> 
        </form>
    </div>    
  );

   
}

 export default FormTodo;
