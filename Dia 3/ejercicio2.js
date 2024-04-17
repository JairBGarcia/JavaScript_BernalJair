// Ejercicio Prefijos

function prefijoComun(strs) {
    if (!strs.length) return "";
    let prefijo = strs[0];
    for (const str of strs) {
      while (str.slice(0, prefijo.length) !== prefijo) {
        if (prefijo.length === 0) return "";
        prefijo = prefijo.slice(0, -1);
      }
    }
    return prefijo;
  }
  
  console.log(prefijoComun(["flor","flujo","vuelo"])); 
  console.log(prefijoComun(["dog","racecar","car"])); 
  