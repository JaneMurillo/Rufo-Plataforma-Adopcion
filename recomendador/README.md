# Recommendation System

Code for RUFO's Module II, taken from the final version of the project. It recommends adoptable dogs by comparing a user's preferences with each pet's characteristics.

The full explanation is in the [project document (in Spanish)](../docs/RUFO-2024A.pdf), in the section "Modulo II Justificación de Sistemas Inteligentes".

## Contents

| Folder | Files | What it contains |
| --- | --- | --- |
| `coseno/` | `main.js`, `knntest2.csv` | Cosine similarity, the chosen method, as a standalone script |
| `knn/` | `knn.py`, `knndataset.csv` | Initial k-nearest neighbors prototype |
| `knn/` | `api_knn.py` | Flask API prototype for the k-NN model |
| `integracion/` | `mascotas-recomendar.js`, `pet-getPetsAInternal.js` | Backend excerpts: the `POST /mascotas/recomendar` route and the pet query |
| `interfaz/` | `Recomend.jsx`, `recomendcontent.jsx` | React interface for choosing preferences and viewing results |

## Feature Vector

Each dog and each user profile is represented by 13 values:

| Group | Columns |
| --- | --- |
| General data | Sexo (sex), Talla (size), Edad (age) |
| Personality (0 or 1) | Activo (active), Amigable (friendly), Carinoso (loving), Jugueton (playful), Obediente (obedient), Protector (protective), Sociable (sociable), Tierno (sweet), Timido (shy), Tranquilo (calm) |

## Running the Scripts

The user profile is defined inside each script as an example.

**Cosine similarity**

```bash
cd coseno
npm install csv-parser
node main.js
```

**k-NN**

```bash
cd knn
pip install scikit-learn pandas
python knn.py
```

## Limitations

- `integracion/` and `interfaz/` are for reference. They depend on the rest of the final version, such as the database and other components, and are not connected to the application in this repository.
- `api_knn.py` is a prototype: it responds with a fixed user profile and queries an example URL on startup.
- The datasets contain only numeric values for pet characteristics.
