const fs = require('fs');
const parse = require('csv-parser');

const data = [];
fs.createReadStream('./knntest2.csv', 'utf-8')
  .pipe(parse())
  .on('data', (row) => {
    const values = Object.values(row).map(Number);
    data.push(values);
  })
  .on('end', () => {
    let perfil_usuario = [0,1,1,1,1,1,1,0,1,1,0,0,0];
    console.log(recomendar(data, perfil_usuario));
  });

function calcularCoseno(a, b){
    let p = 0;
    let p2 = 0;
    let q2 = 0;
    for (let i = 0; i < a.length; i++) {
      p += a[i] * b[i];
      p2 += a[i] * a[i];
      q2 += b[i] * b[i];
    }
    return  p / (Math.sqrt(p2) * Math.sqrt(q2));
  }


  function recomendar(data, perfil_usuario) {
    let perrosSimilares = [];
  
    data.forEach((perro, indice) => {
      let coseno = calcularCoseno(perfil_usuario, perro);
      // Guardar los perros similares junto con su índice para referencia
      perrosSimilares.push({ indice, coseno });
    });
    // Ordenar los perros similares por el valor de coseno (de menor a mayor similitud)
    perrosSimilares.sort((a, b) => b.coseno - a.coseno);
    // Devolver los índices de los perros más similares (los primeros en la lista ordenada)
    return perrosSimilares.map(perro => perro.indice);
  }
