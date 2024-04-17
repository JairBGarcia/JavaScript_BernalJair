//Ejercicio Arboles 

function eliminarNodo(root, key) { //el nodo el arbol y key que es el de eliminar
    if (!root) return null;
  
    if (key < root.val) {
      root.left = eliminarNodo(root.left, key);
    } else if (key > root.val) {
      root.right = eliminarNodo(root.right, key);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
  
      let minNode = root.right;
      while (minNode.left) minNode = minNode.left;
      root.val = minNode.val;
      root.right = eliminarNodo(root.right, root.val);
    }
    return root;
  }
  