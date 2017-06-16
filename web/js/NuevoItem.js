var React = require('react')
var API_lista = require('./servicios/API')
var EventBus = require('./servicios/EventBus')
var App = require('./App')
var Login = require('./Login')
var Home = require('./Home')
var NuevoItemComponente = React.createClass({
    getInitialState() {
        return {
            
            resultado:''
        }
    },
    clickAdd(event) {

      event.preventDefault()
       var nuevo = {
          
           //nombre: this.campoNombre.value,
            nif: this.campoNif.value,
           //cantidad: this.campoCantidad.value,
           name: this.campoName.value,
           //comentario: this.campoComentario.value
           age: this.campoAge.value
       }

       API_lista.addItem(nuevo).then(function(datos){
                 return (datos) ? <div className="alert alert-success">El usuario se ha insertado correctamente</div>  : <div className="alert alert-danger">El nif no puede ser duplicado</div>
            }).then(mesage => this.setState({ resultado: mesage }))

          
       
            
    },
    render: function () {

if (localStorage.login && localStorage.password) {
               return <div className="app">
	             <div className="container">
	              <div className="row">
	               <div className="col-md-8 col-md-offset-3">
		            <h1>Nuevo Usuario</h1>
                                {this.state.resultado} 
	                <div className="panel-body">
	                 <div className="row">
	                   <div className="col-lg-8">
                             
                             <form  onSubmit={this.clickAdd}  className="form-horizontal">

                    <div className="panel panel-primary">
                      <div className="panel-heading">Datos </div>
                         <div className="panel-body">
            
                              <div className="form-group">
			        <div className="input-group">
                                 <span className="input-group-addon">Text</span>  
                                    <input type="text" placeholder="Nif..." className="form-control"
                                       ref={(campo)=>{this.campoNif=campo}} required/> 

			        </div>
			      </div>
		              <div className="form-group">
				 <div className="input-group">
		                    <span className="input-group-addon">Text</span> 
		                        <input type="text" placeholder="Name..." className="form-control"
		                           ref={(campo)=>{this.campoName=campo}} required/> 
				 </div>
			      </div>

                              <div className="form-group">
			         <div className="input-group">
                                    <span className="input-group-addon">Text</span>

                                     <input type="text" placeholder="Age..." className="form-control"
                                        ref={(campo)=>{this.campoAge=campo}}/> <br/>
  			        </div>
		              </div>

                              </div>
		            </div>
         
 				    <input  className="btn btn-primary" type="submit" value="Submit" />
			  </form>
		              </div>
		            </div>
		           </div>
		          </div>
		         </div>

		 
	    </div>
        </div>
   }else{

        return <Home/>
   }
    }
})
module.exports = NuevoItemComponente
