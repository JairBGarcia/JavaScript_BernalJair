class Estudiante {
    constructor(puntos) {
      this.puntos = puntos;
    }
  
    aprobar() {
      return this.puntos >= 6;
    }
  }
  
  class EstudianteNS extends Estudiante {
    constructor(puntos) {
      super(puntos);
    }
  
    aprobar() {
      return this.puntos >= 4;
    }
  }
  
  const estudiantes = [
    new Estudiante(7),
    new EstudianteNS(5),
    new Estudiante(3),
    new EstudianteNS(4)
  ];
  
  estudiantes.forEach((estudiante, indice) => {
    console.log(`Estudiante ${indice + 1}: ${estudiante.aprobar() ? 'Aprobado' : 'No aprobado'}`);
  });
  