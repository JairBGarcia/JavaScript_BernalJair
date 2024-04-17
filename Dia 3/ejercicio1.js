//Reemplazar palabras

function reemplazo(dictionary, sentence) {
    dictionary.sort((a, b) => a.length - b.length);
    return sentence.split(' ').map(palabra => {
      for (let raiz of dictionary) {
        if (palabra.startsWith(raiz)) return raiz;
      }
      return palabra;
    }).join(' ');
  }
  
  const diccionario1 = ["gato", "murciélago", "rata"];
  const frase1 = "el ganado fue sacudido por la batería";
  console.log(reemplazo(diccionario1, frase1));
  
  const diccionario2 = ["a", "b", "c"];
  const frase2 = "aadsfasf absbs bbab cadsfafs";
  console.log(reemplazo(diccionario2, frase2));
  