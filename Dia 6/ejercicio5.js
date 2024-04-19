class Shape {
    calcularArea() {
      return "Metodo de calculo de area de forma base.";
    }
  }
  
  class Circulo extends Shape {
    constructor(radio) {
      super();
      this.radio = radio;
    }
  
    calcularArea() {
      return Math.PI * this.radio ** 2; //Math. PI para calcular la longitud de la circunferencia de un circulo mediante el radio del circulo proporcionado como parametro.
    }
  }
  
  class Triangulo extends Shape {
    constructor(base, altura) {
      super();
      this.base = base;
      this.altura = altura;
    }
  
    calcularArea() {
      return 0.5 * this.base * this.altura;
    }
  }
  
  const circulo = new Circulo(2);
  console.log("Area del cIrculo:", circulo.calcularArea());
  
  const triangulo = new Triangulo(6, 3);
  console.log("Area del triAngulo:", triangulo.calcularArea());
  