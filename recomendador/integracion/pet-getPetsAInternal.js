// Extracto de backend-tests/models/pet.js de la versión final.

const getPetsAInternal = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT pet_id, pet_sex, pet_size, pet_age, ai_active, ai_friendly, ai_affective, ai_playful, ai_obedient, ai_protector, ai_sociable, ai_tender, ai_shy, ai_quiet FROM "Pet"',
      (error, results) => {
        if (error) {
          console.log('Error executing query:', error);
          reject(error);
          return;
        }

        //console.log('Query results:', results);

        if (!results.rows) {
          console.log('No rows returned from the query:', results);
          reject(new Error('No rows returned from the query'));
          return;
        }

        // Map over the results and transform each row into an array of 0s and 1s
        //console.log(results.rows)
        const transformedResults = results.rows.map(row => {
          return [
            row.pet_id,
            row.pet_sex === 'M' ? 1 : 2,
            row.pet_size === 'P' ? 1 : row.pet_size === 'M' ? 2 : 3,
            row.pet_age === 'Cachorro' ? 1 : 2,
            row.ai_active === true ? 1 : 0,
            row.ai_friendly === true ? 1 : 0,
            row.ai_affective === true ? 1 : 0,
            row.ai_playful === true ? 1 : 0,
            row.ai_obedient === true ? 1 : 0,
            row.ai_protector === true ? 1 : 0,
            row.ai_sociable === true ? 1 : 0,
            row.ai_tender === true ? 1 : 0,
            row.ai_shy === true ? 1 : 0,
            row.ai_quiet === true ? 1 : 0,
          ];
        });

        console.log('Transformed results:', transformedResults);
        resolve(transformedResults);
      }
    );
  });
};
