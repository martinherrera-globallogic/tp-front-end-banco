# Trabajo Practico Front-End

## Desarrollador: Martín Herrera

## Stack

El stack elegido fue según lo solicitado:

- Angular v17.2.0 (Latest versions)
- Angular Material v17.2.0 (Latest versions)
- API: MoviesDatabase https://rapidapi.com/SAdrian/api/moviesdatabase/
- Endpoint: https://moviesdatabase.p.rapidapi.com/titles?list=most_pop_series
- Persistencia de la data en localStorage: una vez que se completa el fetch, se guarda una copia de la información en el localStorage para no tener que volver a hacer el llamado si el usuario desea resetear la información.

## Features:

- CRUD: se realizan las cuatro operaciones: lectura, creación, actualización y eliminación de datos.
- Modal de confirmación ante acciones: el usuario debe confirmar su acción ante cada acción que desee realizar.
- Componentes utilizados de Angular Material: Dialog, Snackbar, Table, Buttons, FormField, Input, Icon.
- Aplicación responsiva.
- ReactiveForms para la validación de los inputs al crear o editar información.
- Snackbars para avisarle al usuario cuando se termina de ejecutar una acción.

## Resumen del recorrido del usuario:

- Ingresa a la app donde podrá ver una tabla con la información de las series de televisión que devuelve el endpoint. Dicha tabla posee acciones tanto de edición como de eliminación por cada fila. Si se está en tamaño mobile, la tabla es scrolleable horizontalmente.
- Posibilidad de crear, editar o eliminar una serie o de resetear la data a su estado original.
- Visualización de snackbars ante cada acción.
- Visualización de modales tanto para crear o editar como para eliminar o resetear.

## Imagenes de la aplicación

### Mobile:

### Desktop:
