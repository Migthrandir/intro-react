import React from 'react';
import { AppUI } from './AppUI.js';

/* const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: false },
]; */

// Recibimos como parámetros el nombre y el estado inicial de nuestro item.
function useLocalStorage(itemName, initialValue) {
  const [error,setError] = React.useState(false);
  const [loading,setLoading] = React.useState(true);
   const [item, setItem] = React.useState(initialValue);
  
  React.useEffect(() => {
    setTimeout(() => {
      try {
          // Guardamos nuestro item en una constante
        const localStorageItem = localStorage.getItem('itemName');
        let parsedItem;
        // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
        if (!localStorageItem) {
          localStorage.setItem('itemName', JSON.stringify([]));
          parsedItem = [];
          // Si existen items en el localStorage los regresamos como nuestros items
        } else {
          // Guardamos nuestros items del localStorage en nuestro estado
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch(error) {
          setError(error);
      }
    }, 1000);
  });



  // Actualizamos la función para guardar nuestro item con las nuevas variables y parámetros
   // Creamos la función en la que actualizaremos nuestro localStorage
  const saveItem = (newItem) => {
    try {
      // Convertimos a string nuestros Items
    const stringifiedItem = JSON.stringify(newItem);;
    // Los guardamos en el localStorage
    localStorage.setItem('itemName', stringifiedItem);
    // Actualizamos nuestro estado
    setItem(newItem);
    } catch(error) {
      setError(error);
    }
  };
    // Regresamos los datos que necesitamos
    return {
      item,
      saveItem,
      loading,
      error,
  };
}

function App() {
  const {
    item: todos, 
    saveitem: saveTodos, 
    loading,
    error,
  } = useLocalStorage('TODOS_V1',[]);
  // El estado de nuestra búsqueda
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;
  // Creamos una nueva variable en donde guardaremos las coincidencias con la búsqueda
  let searchedTodos = [];

  // Lógica para filtrar
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

 
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    todos[todoIndex].completed = true;
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  };

  return (
    <AppUI
      loading={loading}
      error={error}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;