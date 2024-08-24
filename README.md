## Tecnologías usadas:

- nodejs
- express
- typescript
- firebase
- ESLint

## Al descargar el proyecto hay que crear el archivo .env ya que por razones de seguridad no se sube al repositorio
## Con la estructura hay que basarse en el archivo: 

- .example.env

## Rutas para consumo del api
## Obtener todos los usuarios

- https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/users

## Validar si existe email

- https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/usersmail?email=mbarrios@gmail.com

## Crear nuevo usuario

https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/users
{
    "username": "example",
    "email": "example@gmail.com"
}

## Obtener las tareas

- https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/tareas

## Crear tareas

https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/tareas
{
        "titulo": "example crear",
        "descripcion": "example crear"
}

## Actualizar tareas

https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/tareas/:id
{
        "titulo": "example actualizar",
        "descripcion": "example actualizar"
}

## Eliminar tarea

- https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/tareas/:id

## Actualizar estado de tarea Completada a Pendiente

https://us-central1-atom-tareas-api.cloudfunctions.net/api/api/tareas/completado
{
        "id": "string",
        "completado": true o false
}