class A {
    constructor(x) {
      this.x = x;
    }
  }
  
  class B extends A {
    constructor(x, y) {
      super(x);
      this.y = y;
    }
  }
  
  class C extends B {
    constructor(x, y, z) {
      super(x, y);
      this.z = z;
    }
  }
  
  const objetoC = new C(1, 2, 3);
  
  console.log(objetoC.x); 
  console.log(objetoC.y); 
  console.log(objetoC.z);
  