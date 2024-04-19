class BankAccount {
    constructor(numeroCuenta, saldo) {
      this.numeroCuenta = numeroCuenta;
      this.saldo = saldo;
    }
  
    depositar(cantidad) {
      if (cantidad > 0) {
        this.saldo += cantidad;
        console.log(`Se depositaron ${cantidad} unidades. Saldo actual: ${this.saldo}`);
      } else {
        console.log("La cantidad a depositar debe ser mayor que cero.");
      }
    }
  
    retirar(cantidad) {
      if (cantidad > 0 && cantidad <= this.saldo) {
        this.saldo -= cantidad;
        console.log(`Se retiraron ${cantidad} unidades. Saldo actual: ${this.saldo}`);
      } else {
        console.log("No se puede retirar esa cantidad. Fondos insuficientes o cantidad inválida.");
      }
    }
  }
  
  const cuenta1 = new BankAccount("123456789", 1000);
  const cuenta2 = new BankAccount("987654321", 500);
  
  
  cuenta1.depositar(200);
  cuenta2.retirar(100);
  