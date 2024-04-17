/*var funcion= {
    tipo1: "Con funcion sin retorno",
    tipo2: "Con funcion con retorno",
    tipo3: "Sin funcion sin retorno",
    tipo4: "Sin funcion con retorno",
};

console.log("Tipo1:", funcion.tipo1);
console.log("Tipo2:", funcion.tipo2);
console.log("Tipo3:", funcion.tipo3);
console.log("Tipo4:", funcion.tipo4);*/

function Usuario(nombre, edad){
    this.nombre =nombre;
    this.edad = edad;
}

const Usuario2 = new Usuario("Jair", 20);
console.log(Usuario2);

