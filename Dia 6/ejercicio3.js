class vehiculo{
    constructor(marca, modelo, año){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }
  }

class coche extends vehiculo{
    constructor(marca, modelo, año, puertas){
        super(marca, modelo, año);
        this.puertas = puertas;
    }
}

let coche1 = new coche("Mercedes", "GLA 450", 2024, "4");

console.log(coche1);
  