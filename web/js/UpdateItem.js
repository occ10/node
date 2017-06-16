var React = require('react')
var API_lista = require('./servicios/API')
var EventBus = require('./servicios/EventBus')
var Login = require('./Login')
var Home = require('./Home')
import {Link} from 'react-router'
var UpdateItem = React.createClass({

    getInitialState() {

        return {
            resultado: '',
            usuario: ''
        }
    },
    
    //Justo antes del render cargamos los elementos
    componentWillMount(){
      EventBus.eventEmitter.addListener('updateItem', this.obtenerElemento)
        
    },

    obtenerElemento: function(nuevo){
        
       this.setState({usuario: nuevo})
             
    },
    clickUpdate (event) {
      event.preventDefault()
       var nuevo = {
          
           _id: this.campoId.value,          
           nif: this.campoNif.value,       
           name: this.campoName.value,
           age: this.campoAge.value
       }
  
       API_lista.UpdateItem(nuevo).then(function(datos){
                 return (datos) ? <div className="alert alert-success">El usuario se ha actualizado correctamente</div>  : <div className="alert alert-danger">Ha habido un error, revisa los datos</div>
            }).then(mesage => this.setState({ resultado: mesage }))
       
            
    },
    render: function () {

if(this.state.usuario){

  if (localStorage.login && localStorage.password) {

    return <div className="app">

	             <div className="container">
	              <div className="row">
	               <div className="col-md-8 col-md-offset-3">
		            <h1>Actualizar Usuario</h1>
                                {this.state.resultado}
	                <div className="panel-body">
	                 <div className="row">
	                   <div className="col-lg-8">
                            
                                 <form method="post" role="form" onSubmit={this.clickUpdate}  className="form-horizontal">

                                    <div className="panel panel-primary">
                                     <div className="panel-heading">Datos </div>
                                      <div className="panel-body">
            
                                        <div className="form-group">
			                   <div className="input-group">
                                             <span className="input-group-addon">Text</span>
                                               <input id='id'type="text" disabled defaultValue={this.state.usuario._id} className="form-control"
                                                  ref={(campo)=>{this.campoId=campo}}/> 
			                   </div>
			                </div>

                                        <div className="form-group">
			                   <div className="input-group">
                                             <span className="input-group-addon">Text</span>
                                               <input type="text" defaultValue={this.state.usuario.nif} className="form-control"
                                                ref={(campo)=>{this.campoNif=campo}}/> 
			                   </div>
			                </div>

                                        <div className="form-group">
			                  <div className="input-group">
                                             <span className="input-group-addon">Text</span>
                                                <input type="text" defaultValue={this.state.usuario.name} className="form-control"
                                                   ref={(campo)=>{this.campoName=campo}}/>
			                  </div>
			                </div>

                                        <div className="form-group">
			                    <div className="input-group">
                                                <span className="input-group-addon">Text</span>
                                                   <input type="text" defaultValue={this.state.usuario.age} className="form-control"
                                                       ref={(campo)=>{this.campoAge=campo}}/> 

			                    </div>
			                </div>

                                  </div>
		                </div>

           <input  className="btn btn-primary" type="submit" value="Actualizar" />
           
           
            <Link className="btn btn-primary" to="list" >Ocultar Update</Link>
 			  </form>
		              </div>
		            </div>
		           </div>
		          </div>
		         </div>

		 
	    </div>
        </div>
       }else{

          return  <Home/>
      
       }
    }else
         return  <Home/>
    }

})
module.exports = UpdateItem
