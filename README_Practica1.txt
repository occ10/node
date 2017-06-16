Introduccion:

Se trata de una aplicacion para la gestion de casas y coches de los universitarios, donde la gente puede acceder poner
publicaciones y otros que la utilizan para fines de encontrar casa para compartir o coche para venir a la universidad.


Puntos hechos:
1. Casos de uso:  he hecho 40 casos de uso, incluso casos de uso con paginacion.
2. Testing
3. autentifticación BASIC
4. Base De Datos real, mongoDB.
5. JSON Web Token.
6. Documentar el API, he utilizado la herramienta swagger, tengo el fichero yaml, solo utilizar la herramienta online 
     http://editor.swagger.io/   y importar el fichero swagger.yaml.


Base de datos:
la base de datos utilizada en esta app es mongodb.


Autenticacion:

para utilizar el basic autentication hay que descomentar  linea 34 index.js, y utilizar el usuario foo y contraseña bar
app.all('*', auth.basicAuth); 

para utilizar el token JSONG hay que descomentar la linea 38 index.js 
app.all('*', middleware.ensureAuthenticated); 

y poner el token siguiente en el postman
opcion headers 
clave:Authorization 
value: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlhdCI6MTQ3NzczMDAyOCwiZXhwIjoxNDc4OTQzMjI4fQ.Z7COE7WqmCh0iKcY3K2jR1wHXtqK12xWrplmuwA1PMU


Documentacion:
en cuanto a la documentacion he utilizado la herramienta swagger, alli estan todas las rutas que presentan los casos de uso de la aplicacion y la explicacion de las mismas.

En cuanto a la autenticacion basic y el token jsong, los aplico sobre todos los casos de uso, ya que eso pone la app mas segura y no se puede usar si el usuario no esta dado de alta en el sistema.


-En los casos de uso de consulta de un recurso sabiendo su id hay que justificar en la documentación por qué o por qué no se incluyen los objetos relacionados. Por ejemplo al leer un post de un blog, se podrían incluir los comentarios completos, solo los ids o solo el post en sí.
respecto a la pregunta anterior, he utilizado varios casos de uso, pasando el id y que devuelvan la informacion relacionada, por ejemplo en la ruta siguiente localhost:3000/api/user/opinion/coche/:id se devuelve las opiniones de un usuario pasando su id, la cual se puede ver las opiniones  de un usuario sobre los coches de la base de datos. la he utilizado ya que cuando un usuario quiere ver informacion sobre un coche, puede ver las opiniones puestas sobre ese coche para ayudarle a tomar una decision poder utilizar el mismo o no.




Casos de uso:

-insertar un usuario
localhost:3000/api/user
{
"nif":"XXXX", debe ser unico
"name":"XXX",
"age":10

}

-insertar una casa
localhost:3000/api/house
el cuerpo de jsong es el siguiente 
{
"_creator":id,   es el id de un usuario que esta dado de alta en la base de datos, el id lo tengo como autoincrement
"zona":"XXXX",
"precio":20,
"telefono":"999999",
"observacion":"XXXXXX"

}

 


-insertar un coche
localhost:3000/api/car

para insertar un coche el cuerpo del jsong es lo siguiente:

{
"_creator":id, id del dueño del coche
"matricula":"XXXXX", es un dato unico no se puede repitir
"modelo":"XXXX",
"color":"XXXX",
"precio":100

}


-insertar una opinion de un usuario sobre un coche
localhost:3000/api/user/opinion/coche

ejemplo de insertar una opinion sobre un coche
{
"_user":id  , el id del usuario en la base de datos, cuando se inserta un usuario, se le asigna un id automaticamente, porque es un dato autoincrement
"_car":id, el id del coche en la base de datos
"opinion":"XXXXXXX"
}


-insertar una opinion sobre una casa
localhost:3000/api/opinion/casa


ejemplo de insertar una opinion
{
"_user":id  , el id del usuario en la base de datos, cuando se inserta un usuario, se le asigna un id automaticamente, porque es un dato autoincrement
"_casa":id, el id del coche en la base de datos
"opinion":"XXXXXXX"
}



-devolver todos los usarios de la app   
localhost:3000/api/users 

-devolver un usario dado con su nif
-borrar un usuario dado con su nif
-actualizar un usuario dado con su nif
localhost:3000/api/user/nif/:nif

el metodo actualizar ademas de pasar el nif como parametro hay un cuerpo jsong de los campos se pretende actualizar:

{

"name":"XXX",
"age":10

}


-devolver un usario dado con su id
-borrar un usuario dado con su id
-actualizar un usuario dado con su id
localhost:3000/api/user/id/:id

el metodo actualizar ademas de pasar el id como parametro hay un cuerpo jsong de los campos se pretende actualizar:

{

"name":"XXX",
"age":10

}

-devolver todas las casas dadas de alta en el sistema
localhost:3000/api/user/house

-actualizar una casa dado su id.
-borrar una casa dado su id.
-devolver una casa dado su id.
localhost:3000/api/house/id/:id

en el metodo actualizar ademas del id de la casa al que se pretende actuaizar se debe enviar un jsong con los campos siguientes, aunque no es obligatorio incluir todos los campos

{
"_creator":id,   es el id de un usuario que esta dado de alta en la base de datos, el id lo tengo como autoincrement

"zona":"XXXX",
"precio":00,
"telefono":"999999",  es un campo unico
"observacion","XXXXXX"

}

-devolver todos los coches dados de alta en el sistema
localhost:3000/api/user/car

-devolver un coche pasando su id
-borrar un coche pasando su id
-actualizar un coche pasando su id
localhost:3000/api/car/id/:id

el metodo actualizar ademas de pasar el id del coche, se debe incluir el cuerpo jsong siguguiente:
a la hora de actualizar no es obligatorio incluir todos los campos
{
"_creator":id, id del dueño del coche
"matricula":"XXXXX", es un dato unico no se puede repitir
"modelo":"XXXX",
"color":"XXXX",
"precio":100

}

-devolver todas las opiniones hechas sobre una casa
localhost:3000/api/user/opinions/casa

-devolver una opinion hecha sobre una casa pasando el id de la opinion
-actualizar la opinion pasando su id como parametro
-borrar la opinion pasando su id
localhost:3000/api/opinion/casa/:id

en el metodo actualizar una opinion sobre una casa ademas de pasar el id de la opinion see debe incluir el cuerpo jsong siguiente:

{
"_user":id  , el id del usuario en la base de datos, cuando se inserta un usuario, se le asigna un id automaticamente, porque es un dato autoincrement
"_casa":id, el id de la casa en la base de datos
"opinion":"XXXXXXX"
}



-devolver todas las opiniones hechas sobre un coche
localhost:3000/api/user/opinions/coche

-devolver una opinion hecha sobre un coche pasando el id de la opinion
-actualizar la opinion pasando su id como parametro
-borrar la opinion pasando su id
localhost:3000/api/opinion/coche/:id

en el metodo actualizar una opinion sobre un coche ademas de pasar el id de la opinion see debe incluir el cuerpo jsong siguiente:

{
"_user":id  , el id del usuario en la base de datos, cuando se inserta un usuario, se le asigna un id automaticamente, porque es un dato autoincrement
"_car":id, el id del coche en la base de datos
"opinion":"XXXXXXX"
}




-lectura de una colección de usuarios utilizando paginado,
id significa indice, por ejemplo si el id es 2, empieza a devolver los resultados apartir del registro 2.
localhost:3000/api/collection/user/:id  

-devolver las casa que pertencen a un usuario pasando el id del usuario.
localhost:3000/api/user/houses/:id

-una casa como dato tiene el telefono, utilizar el telefono de la casa para conseguir informacion del usuario a quien pertenece la casa en el sistema.
localhost:3000/api/user/house/:tel

-un coche tiene como dato matricula, y cuando se pasa la matricula como parametro, se devuelve la informacion de su dueño, por ejemplo su nif o su nombre.
localhost:3000/api/user/car/matricula/:matricula

-lectura de una colección de casas utilizando paginado
localhost:3000/api/collection/house/:id


-devolver los coches que pertenecen a un usuario pasando el id del usuario
localhost:3000/api/user/car/:id


-devolver un coche pasando su id
localhost:3000/api/car/id/:id


-lectura de una colección de coches utilizando paginado
localhost:3000/api/collection/car/:id


-devolver las opiniones de un usuario dado su id sobre los coches
localhost:3000/api/user/opinion/coche/:id


-devolver el nif de un usuario pasando el id de la opinion
localhost:3000/api/user/opinion/coche/nif/:id

-lectura de una colección de opiniones sobre coches utilizando paginado
localhost:3000/api/collection/opinion/coche/:id




-devolver las opiniones de un usuario sobre las casas pasando el id del usuario
localhost:3000/api/user/opinion/casa/:id


-lectura de una colección de opiniones sobre las casas utilizando paginado
localhost:3000/api/collection/opinion/casa/:id





