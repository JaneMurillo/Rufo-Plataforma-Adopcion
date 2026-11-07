const Router = require('express');
const pet_model = require('./../models/pet');
const db = require('./../src/db');

const router = Router();
router.get('/pet', (req, res) => {
  db.any('SELECT * FROM "Pet"', [])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error en adopta');
      console.log(err);
      res.status(500).send(err);
    });
});

/*router.get('/pet/admin/table', (req, res) => {
  db.any(
    'SELECT "Pet"."pet_id", "Pet"."pet_specie", "Pet"."pet_breed", "fecha"."fecha", "Pet"."pet_sex", "Pet"."pet_size", "Pet"."pet_age", count("solicitudes"."adopreq_pet_id"), "salud"."health_state" FROM "Pet"\
  INNER JOIN (SELECT "Health_Card"."health_pet_id", MIN("Health_Card"."health_date") AS fecha FROM "Health_Card" GROUP BY "Health_Card"."health_pet_id") AS fecha ON "Pet"."pet_id"="fecha"."health_pet_id"\
  INNER JOIN (SELECT "Adoption_Request"."adopreq_pet_id", COUNT("Adoption_Request"."adopreq_id") AS "solicitudes" FROM "Adoption_Request" GROUP BY "Adoption_Request"."adopreq_pet_id") as solicitudes ON "Pet"."pet_id"="solicitudes"."adopreq_pet_id" \
  INNER JOIN (SELECT "Health_Card"."health_pet_id", MAX("Health_Card"."health_date") AS fecha, "Health_Card"."health_state"  FROM "Health_Card" GROUP BY "Health_Card"."health_pet_id", "Health_Card"."health_state" ) AS salud ON "Pet"."pet_id"="salud"."health_pet_id"\
  GROUP BY "Pet"."pet_id", "fecha"."fecha", "salud"."health_state" ;',
    []
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error en tabla de mascotas de admin');
      console.log(err);
      res.status(500).send(err);
    });
});*/

router.get('/pet/admin/table/2', (req, res) => {
  db.any(
    'SELECT * FROM "Pet" LEFT JOIN "Health_Card" ON health_pet_id = pet_id LEFT JOIN (SELECT COUNT(*), adopreq_pet_id FROM "Adoption_Request" GROUP BY adopreq_pet_id) AS count ON adopreq_pet_id = pet_id ORDER BY pet_id ASC'
  )
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].health_date !== null) {
          data[i].health_date =
            (data[i].health_date.getDate() < 10
              ? '0' + data[i].health_date.getDate()
              : data[i].health_date.getDate()) +
            '/' +
            (data[i].health_date.getMonth() + 1 < 10
              ? '0' + (data[i].health_date.getMonth() + 1)
              : data[i].health_date.getMonth() + 1) +
            '/' +
            data[i].health_date.getFullYear();
        }
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error al recurperar tabla admin 2');
      console.log(err);
      res.status(200).send(err);
    });
});

router.post('/pet', (req, res) => {
  pet_model
    .createPet(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.delete('/delete/pet/:pet_id', (req, res) => {
  console.log('eliminar mascota ruta');
  db.any('SELECT * FROM "Adoption_Request" WHERE adopreq_pet_id = $1', [
    req.params.pet_id,
  ]).then((results) => {
    if (results.length > 0) {
      res.send(
        'La mascota no puede ser eliminado ya que hay solicitudes de adopcion en su nombre'
      );
    } else {
      db.none('DELETE FROM "Health_Card" WHERE health_pet_id = $1', [
        req.params.pet_id,
      ])
        .then(() => {
          console.log('tarjeta de salud eliminada');
          db.none('DELETE FROM "Pet" WHERE pet_id = $1', [req.params.pet_id])
            .then(() => {
              console.log('mascota eliminada');
              res.send('Mascota eliminada correctamente');
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500).send(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    }
  });

  /*pet_model
    .deletePet(req.params.pet_id)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });*/
});

router.get('/pet/offset/:offset', (req, res) => {
  db.any('SELECT * FROM "Pet" OFFSET $1 LIMIT 2', [req.params.offset]).then(
    (response) => {
      response.forEach((pet) => {
        pet.pet_personality = pet.pet_personality.split('.');
      });
      db.one('SELECT COUNT(*) FROM "Pet"').then((count) => {
        res.status(200).send({ display: response, count: count.count });
      });
    }
  );
});

router.post('/filter/offset/:offset', (req, res) => {
  //console.log('cuerpo filtro:');
  //console.log(JSON.stringify(req.body));
  db.any(
    "SELECT * FROM \"Pet\" WHERE pet_size ILIKE '%$2#%' AND pet_sex ILIKE '%$3#%' AND pet_age ILIKE '%$4#%' AND (pet_name ILIKE '%$5#%' OR pet_specie ILIKE '%$5#%') OFFSET $1 LIMIT 5 ",
    [
      req.params.offset,
      req.body.talla,
      req.body.sexo,
      req.body.edad,
      req.body.word,
    ]
  ).then((response) => {
    //console.log('respuesta filtro: ');
    //console.log(JSON.stringify(response));
    response.forEach((pet) => {
      pet.pet_personality = pet.pet_personality.split('.');
    });
    db.one(
      "SELECT COUNT(*) FROM \"Pet\" WHERE pet_size ILIKE '%$1#%' AND pet_sex ILIKE '%$2#%' AND pet_age ILIKE '%$3#%' AND (pet_name ILIKE '%$4#%' OR pet_specie ILIKE '%$4#%')",
      [req.body.talla, req.body.sexo, req.body.edad, req.body.word]
    ).then((count) => {
      res.status(200).send({ display: response, count: count.count });
    });
  });
});

router.post('/search', (req, res) => {
  db.any(
    "SELECT * FROM \"Pet\" WHERE (pet_name ILIKE '%$1#%' OR pet_specie ILIKE '%$1#%') AND pet_size ILIKE '%$2#%' AND pet_sex ILIKE '%$3#%' AND pet_age ILIKE '%$4#%' LIMIT 5",
    [req.body.word, req.body.talla, req.body.sexo, req.body.edad]
  ).then((response) => {
    response.forEach((pet) => {
      pet.pet_personality = pet.pet_personality.split('.');
    });
    db.one(
      "SELECT COUNT(*) FROM \"Pet\" WHERE (pet_name ILIKE '%$1#%' OR pet_specie ILIKE '%$1#%') AND pet_size ILIKE '%$2#%' AND pet_sex ILIKE '%$3#%' AND pet_age ILIKE '%$4#%'",
      [req.body.word, req.body.talla, req.body.sexo, req.body.edad]
    ).then((count) => {
      res.status(200).send({ display: response, count: count.count });
    });
  });
});

module.exports = { router };
