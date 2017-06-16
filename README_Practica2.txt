En esta partica, para hacer la parte de reacty y js nativo he creado dos carpetas, una que se llama web para react y otra que se llama web-js para jsnativo


una vez estoy en la raiz del proyecto ejecuto nodemon para arrancar la app en el servidor. En el ejemplo de react para comprobar su funcionamiento ejecuto el comando  
npm run watch
una vez esta en marcha meto en el navegador este url http://localhost:3000/web, la primera vista que sale es la del login,
para logearse, he creado un caso de uso, con los datos 

usuario: chamit  
contraseña: occ10

 accedo a la parte privada, si los datos nos son correctos, no se deja acceder y pone un mensaje que los datos son incorrectos.
cuando los datos son correctos demuestra un menu en la parte superior con tres opciones en la parte izquierda about, list y Nuevo Usuario
y la opcion logout en la parte derecha,  Tambien aparece un mensaje en el body saludando al usuario con su login que ha ofrecido, en la parte de list, esta la lista de los usuario con el id y el name mas las acciones que se pueden hacer por ejemplo detalles de usuario, actualizar usuario  y eleminar usuario. Para añadir un nuevo usuario en la opcion nuevo usuario se incluye un componente con un formulario, el campo nif no puede ser duplicado, porque en el modelo usuario lo he especificado como unique.

En cuanto a la parte de js nativo, ejecuto el comando siguiente "npm run jsnativo", y en el navegador insertar
url:  http://localhost:3000/web-js/

antes de todo se deben haber usuarios para utilizar las partes de eleminar, actualizar y ver detalles de un usuario, tanto en la parte 
de react como en js nativo
 



