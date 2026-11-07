// Extracto de backend-tests/routes/mascotas.js de la versión final.

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
      let coseno = calcularCoseno(perfil_usuario, perro.slice(1));
      // Guardar los perros similares junto con su índice para referencia
      perrosSimilares.push({ indice: perro[0], coseno });
    });
    // Ordenar los perros similares por el valor de coseno (de menor a mayor similitud)
    perrosSimilares.sort((a, b) => b.coseno - a.coseno);
    console.log(perrosSimilares)
    // Devolver los índices de los perros más similares (los primeros en la lista ordenada)
    return perrosSimilares.map(perro => perro.indice);
  }


router.post('/recomendar', async (req, res) => {
  try {
    const perfil_usuario =req.body.selectedCheckboxes;
    console.log('Perfil usuario',perfil_usuario);
    //let perfil_usuario = [0,1,1,1,1,1,1,0,1,1,0,0,0];
    const data = await pet_model.getPetsAInternal();
    //console.log('Si recom:',recomendar(data, perfil_usuario));
    indices_perros_similares = recomendar(data, perfil_usuario);
    res.status(200).json({ recommendation: indices_perros_similares });
    //res.status(200).json({ data });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
