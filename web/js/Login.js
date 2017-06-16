var React = require('react')
var API_lista = require('./servicios/API')
var EventBus = require('./servicios/EventBus')
import {hashHistory} from 'react-router';
var App = require('./App')
var Home = require('./Home')
var Login = React.createClass({

    

    getInitialState : function () {
      return {mensaje: ''}
    },
    logout : function () {
      localStorage.clear();
      
    },
    clickLog: function () {
       var nuevo = {
           login: this.campoName.value,
           password: this.campoPassword.value
       }

       API_lista.Loging(nuevo).then(function(datos){
            
       })
            
    },
  LoginClick : function() {
    this.setState({isLoggedIn: true});
  },

  LogoutClick : function () {
    this.setState({isLoggedIn: false});
  },


  Entrar(event) {

   event.preventDefault();
	if(this.campoName.value!= '' && this.campoPassword.value != ''){
	    var nuevo = {
		   login: this.campoName.value,
		   password: this.campoPassword.value
	       }

	       API_lista.Loging(nuevo).then(function(datos){

                // return (datos) ? '' : <div className="alert alert-danger">Datos no válidos</div>
            //}).then(mesage => this.setState({ mensaje: mesage }))
		   
	       if(datos)
                 location.reload();
               
               else
                    return (datos) ? '' : <div className="alert alert-danger">Datos no válidos</div>
                            }).then(mesage => this.setState({ mensaje: mesage }))
               
	    
	}



  },
    render: function () {


           if (localStorage.login && localStorage.password) {

            return <Home/>
           }else{
             return <div className="app">
	             <div className="container">
	              <div className="row">
	               <div className="col-md-8 col-md-offset-4">
		            <h1>Login</h1>
                                 {this.state.mensaje}
	                <div className="panel-body">
	                 <div className="row">
	                   <div className="col-lg-8">

		            <form  onSubmit={this.Entrar}  className="form-horizontal">
                               
                              <div className="panel panel-primary">
                                <div className="panel-heading">Datos </div>
                                   <div className="panel-body">


		           <div className="form-group">
			    <div className="input-group">
                              <span className="input-group-addon">Text</span>
				    <input type="text" placeholder="Login..." className="form-control"
					   ref={(campo)=>{this.campoName=campo}}  required/> 
			  
			   </div>
		          </div>
			  <div className="form-group">
			    <div className="input-group">
                              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
				    <input type="text" placeholder="Password..." className="form-control"
					   ref={(campo)=>{this.campoPassword=campo}} required/>

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
                 }
    
    }


})
module.exports = Login
