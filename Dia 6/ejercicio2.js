class Rectangulo {
    constructor() {
      this.anchura = 0;
      this.altura = 0;
    }
  
    setAnchura(valor) {
      this.anchura = valor;
    }
  
    setAltura(valor) {
      this.altura = valor;
    }
  
    calcularArea() {
      return this.anchura * this.altura;
    }
  
    calcularPerimetro() {
      return 2 * (this.anchura + this.altura);
    }
  }
  
  let rectangulo = new Rectangulo();
  let anchura = parseFloat(prompt("Ingrese la anchura del rectángulo:"));
  let altura = parseFloat(prompt("Ingrese la altura del rectángulo:"));
  
  rectangulo.setAnchura(anchura);
  rectangulo.setAltura(altura);
  
  console.log(rectangulo.calcularArea());
  console.log(rectangulo.calcularPerimetro());
  