from sklearn.neighbors import NearestNeighbors
import numpy as np
import pandas as pd

dataset = pd.read_csv('knndataset.csv',
engine='python', index_col=0)
perros = dataset.values
total_perros = perros.shape[0]
print(f"Total de perros en el dataset: {total_perros}")

# Crear el modelo KNN
knn = NearestNeighbors(n_neighbors=20)
knn.fit(perros)

#Usuario
perro_usuario = np.array([[0,1,1,1,1,1,1,0,1,1,0,1,0]])
distancias, indices = knn.kneighbors(perro_usuario)

# Imprimir los índices de los perros recomendados
print(indices)
print (distancias)





