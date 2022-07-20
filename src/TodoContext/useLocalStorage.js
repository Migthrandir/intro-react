import React from "react";

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

  export { useLocalStorage };