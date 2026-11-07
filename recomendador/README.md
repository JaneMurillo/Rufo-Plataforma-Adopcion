# Sistema de recomendación

Código del Módulo II de RUFO, tomado de la versión final del proyecto. Recomienda perros en adopción comparando las preferencias del usuario con las características de cada mascota.

La explicación completa está en el [documento del proyecto](../docs/RUFO-2024A.pdf), en la sección "Modulo II Justificación de Sistemas Inteligentes".

## Contenido

| Carpeta | Archivos | Qué contiene |
| --- | --- | --- |
| `coseno/` | `main.js`, `knntest2.csv` | Similitud de coseno, el método elegido, en un script independiente |
| `knn/` | `knn.py`, `knndataset.csv` | Prototipo inicial con k-vecinos más cercanos |
| `knn/` | `api_knn.py` | Prototipo de API en Flask para el modelo k-NN |
| `integracion/` | `mascotas-recomendar.js`, `pet-getPetsAInternal.js` | Extractos del backend: la ruta `POST /mascotas/recomendar` y la consulta de mascotas |
| `interfaz/` | `Recomend.jsx`, `recomendcontent.jsx` | Interfaz en React para elegir preferencias y ver resultados |

## Vector de características

Cada perro y cada perfil de usuario se representan con 13 valores:

| Grupo | Columnas |
| --- | --- |
| Datos generales | Sexo, Talla, Edad |
| Personalidad (0 o 1) | Activo, Amigable, Cariñoso, Juguetón, Obediente, Protector, Sociable, Tierno, Tímido, Tranquilo |

## Ejecutar los scripts

El perfil de usuario está definido dentro de cada script como ejemplo.

**Similitud de coseno**

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

## Limitaciones

- `integracion/` e `interfaz/` son material de consulta. Dependen del resto de la versión final, como la base de datos y otros componentes, y no están conectados a la aplicación de este repositorio.
- `api_knn.py` es un prototipo: responde con un perfil de usuario fijo y, al iniciar, consulta una URL de ejemplo.
- Los conjuntos de datos solo contienen valores numéricos de características de mascotas.
