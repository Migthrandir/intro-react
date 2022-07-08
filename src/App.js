import './App.css';
import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { CreateTodoButton } from "./CreateTodoButton.js";

const todos=[
  {text:'Cortar cebolla', completed:true},
  {text:'Tormar el curso de intro a react', completed:false},
  {text:'Llorar con la llorona', completed:false},
  { text: 'LALALALAA', completed: false },
];

function App() {
  return (
    <>
      <TodoCounter />    
      <TodoSearch />
      <TodoList>
        {todos.map(todo => (
          <TodoItem 
          key={todo.text} 
          text={todo.text}
          completed={todo.completed} />
        ))}
      <TodoItem />
      </TodoList>
      <CreateTodoButton />
    </>
  );
}

export default App;
