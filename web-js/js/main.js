var API = require('./services/API.js')
var handlebars = require('handlebars')


var count = 0
var Registros = 0
var tamPagina=3

var appcontainer = `

       <div class="app">
              <div className="header">

		        <nav class="navbar navbar-inverse">
		          <div class="container-fluid">

		         </div>
		       </nav>
              </div>
              <div class="container">
                  
                <div class="row">
                    <div class="contenido col-lg-8 col-lg-offset-2">
                       <div id="detalles"></div>
   							{{{cuerpo}}}
                    </div>
                    
                </div>
              </div>
             
        </div>
		`


var usuario = `

   <tr id="{{_id}}">
		<td>{{_id}}</td>
		<td>{{name}}</td>
		<td>{{nif}}</td>
		<td>{{age}}</td>
		<td><a id="itemDetalle-{{_id}}" href="javascript:verDetalles({{_id}})">Ver Detalles</a> <a id="itemDelete-{{_id}}" href="javascript:eliminar({{_id}})">Eliminar</a>  <a id="itemEdit-{{_id}}" href="javascript:formularioEditar({{_id}})">Editar</a></td>
   </tr>
`


var listaUsuario = `
<h2>Listado de usuarios</h2>
<select id="tamPagina" name="tamPagina" onchange="javascript:changeTamPage()">
		<option selected value="3">3</option>
		<option value="6">6</option>
		<option value="9">9</option>
	</select>
 <table class="table table-striped">
	<thead>
		<tr>
			<th>ID</th>
			<th>Nombre</th>
			<th>Nif</th>
			<th>Edad</th>
			
		</tr>
	</thead>
	<tbody>
	{{#.}}
		${usuario}
	{{/.}}
	</tbody>
</table>
<a id="anterior" href="javascript:last()">Anterior</a> - <a id="siguiente" href="javascript:next()">Siguiente</a> 
`

var actualizar = `

		            <h1>Actualizar Usuario</h1>
                            
	                <div class="panel-body">
	                 <div class="row">
	                   <div class="col-lg-8">
                            
                                 <form method="post" role="form"   class="form-horizontal" onsubmit=javascript:update()>

                                    <div class="panel panel-primary">
                                     <div class="panel-heading">Datos </div>
                                      <div class="panel-body">
            
                                        <div class="form-group">
			                   <div class="input-group">
                                             <span class="input-group-addon">Text</span>
                                               <input id='id'type="text" disabled  value="{{_id}}" class="form-control"/> 
			                   </div>
			                </div>

                                        <div class="form-group">
			                   <div class="input-group">
                                             <span class="input-group-addon">Text</span>
                                               <input id="nif" type="text" required="required" value="{{nif}}" class="form-control"/> 
			                   </div>
			                </div>

                                        <div class="form-group">
			                  <div class="input-group">
                                             <span class="input-group-addon">Text</span>
                                                <input id="name" type="text" required="required" value="{{name}}" class="form-control"/>
			                  </div>
			                </div>

                                        <div class="form-group">
			                    <div class="input-group">
                                                <span class="input-group-addon">Text</span>
                                                   <input id="age" type="text" required="required" value="{{age}}" class="form-control"/> 

			                    </div>
			                </div>

                                  </div>
		                </div>

           <input  class="btn btn-primary" type="submit" value="Actualizar" />
           
           <a  class="btn btn-primary" href="javascript:ocultarFormulario({{_id}})">Ocultar</a>
            
 			  </form>
		              </div>
		            </div>
		           </div> 
`


////////////////

var detallesUsuario = `
  <div>
		<h1>Detalles Usuario {{_id}} - {{name}}</h1>
		<ul>
			<li><span>ID: </span>{{_id}}</li>
			<li><span>Nombre: </span>{{name}}</li>
			<li><span>Email: </span>{{nif}}</li>
			<li><spa>Año nacimiento: </span>{{age}}</li>
		</ul>
                <div><a id="ocultar-{{_id}}" href="javascript:ocultarDetalles({{_id}})">Ocultar</a></div>
</div>

`


var contenido = handlebars.compile(appcontainer)
var lista = handlebars.compile(listaUsuario)
var detalles = handlebars.compile(detallesUsuario)
var editar = handlebars.compile(actualizar)

document.addEventListener('DOMContentLoaded', function(){
	obtenerItems()
})


document.addEventListener('submit', function(event){
	event.preventDefault()
})



function collection(){
	obtenerItems()
}

window.collection = collection



function obtenerItems(){
      
        var tamSeleccionado = (document.getElementById("tamPagina"))? document.getElementById("tamPagina").selectedIndex: tamPagina

        API.obtenerItems().then(function(datos){
          Registros=datos.length
            //alert(Registros)
        })
        
        var tam={
                count:count,
                tamPag:tamPagina
    
        }
	API.obtenerCollection(tam).then(function(datos) {

		var result = lista(datos)

		var datos = {
			cuerpo: result
		};

		document.getElementById("componente").innerHTML = contenido(datos)
                document.getElementById("tamPagina").selectedIndex = tamSeleccionado

	})
}

window.obtenerItems = obtenerItems


function last(){

        var resultado = (count-tamPagina <= 0)? 0 : count-tamPagina
	count = (count <= 0)? 0 : resultado
	obtenerItems()
}

window.last = last

function next(){


	count =  (count >= Registros-tamPagina)? count : count+tamPagina
	
	obtenerItems()
}

window.next = next



function verDetalles(id) {

        var nuevo = {
               "id":id,

            }
	API.obtenerItem(nuevo).then(function(dato){

		var datos = {_id: dato._id, name: dato.name, nif: dato.nif, age: dato.age}
		var datosHTML = detalles(datos)
		var divItem = document.getElementById('detalles')
		divItem.insertAdjacentHTML('beforeend', datosHTML)	
		
	})
}

window.verDetalles = verDetalles

function ocultarDetalles(id) {

	document.getElementById('detalles').innerHTML = ''


}

window.ocultarDetalles = ocultarDetalles

function ocultarFormulario(id) {

	document.getElementById('detalles').innerHTML = ''


}

window.ocultarFormulario = ocultarFormulario

function eliminar(id) {
	       var resultado = (count-tamPagina <= 0)? 0 : count-tamPagina
               var item={
                  '_id':id
               }
               count = (count == Registros-1)? resultado : count
               
		API.DeleteItem(item).then(function(dato){

			obtenerItems()
		})
	
}

window.eliminar = eliminar




function formularioEditar(id) {



var nuevo = {
               "id":id,

            }
	API.obtenerItem(nuevo).then(function(dato){

		var datos = {_id: dato._id, name: dato.name, nif: dato.nif, age: dato.age}
		var datosHTML = editar(datos)
		var divItem = document.getElementById('detalles')
                var node = document.createElement("div"); 
		node.insertAdjacentHTML('beforeend', datosHTML)	
                divItem.appendChild(node);
		
	})

}

window.formularioEditar = formularioEditar



function update() {

	var item = {
		_id: document.getElementById('id').value,
		name: document.getElementById('name').value,
		nif: document.getElementById('nif').value,
		age: document.getElementById('age').value,
	}

	API.UpdateItem(item).then(function (datos) {

		obtenerItems()
	})
}

window.update = update


function changeTamPage(){
	tamPagina = parseInt(document.getElementById("tamPagina").value)
        
	obtenerItems()
}

window.changeTamPage = changeTamPage
