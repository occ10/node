var React = require('react')
var Item = require('./Item')
var DetallesItem = require('./DetallesItem')
var UpdateItem = require('./UpdateItem')
var API_lista = require('./servicios/API')
var EventBus = require('./servicios/EventBus')
var Login = require('./Login')
var Home = require('./Home')
import {Link} from 'react-router'

//var count = 0
//var Registros = 0
//var tamPagina=3


module.exports = React.createClass({
    componentWillMount: function () {

        this.refrescarItems(this.state.count,this.state.tamPagina)
        this.totalRegistros()
        
    },
    getInitialState : function () {

     
      return {
               items:[],
               count:0,
               totalRegistros:0,
               tamPagina:3,
               result:''
             }
    }, 

      totalRegistros: function (){

        API_lista.obtenerItems()
            .then(datos => {
                
                this.setState({totalRegistros: datos.length})
            })
        
    },
      changeTamPage: function(objeto){
        this.refrescarItems(this.state.count,objeto.target.value)
    },
     next : function () {
     
    var aux =  (this.state.count >= this.state.totalRegistros-this.state.tamPagina)?  this.state.count : this.state.count+this.state.tamPagina

    this.setState({count: (this.state.count >= this.state.totalRegistros-this.state.tamPagina)?  this.state.count : this.state.count+this.state.tamPagina });
    
    this.refrescarItems(aux,this.state.tamPagina)
      
    },

     last : function () {
       
        var resultado = (this.state.count-this.state.tamPagina <= 0)? 0 : this.state.count-this.state.tamPagina
        this.setState({count: (this.state.count-this.state.tamPagina <= 0)? 0 : this.state.count-this.state.tamPagina});

          this.refrescarItems(resultado,this.state.tamPagina)
    },
    refrescarItems: function (val1,val2) {

         var tam = {
              count : val1,
              tamPag : val2
             } 
        API_lista.obtenerCollection(tam)
            .then(datos => {
                this.setState({items: datos,tamPagina: parseInt(val2)})
            })
          
    },

     clickDel: function (id) {

       var nuevo = {         
           _id: id,          
       }
         var resultado = (this.state.count-this.state.tamPagina <= 0)? 0 : this.state.count-this.state.tamPagina
       var aux = (this.state.count == this.state.totalRegistros-1)? resultado : this.state.count
    
       API_lista.DeleteItem(nuevo).then(function(datos){
                           return (datos) ? <div className="alert alert-success">El usuario se ha eleminado con exito</div> : <div className="alert alert-danger">El usuario no se ha podido eliminar</div>
       }).then(mensaje => this.setState({count: (this.state.count == this.state.totalRegistros-1)? resultado : this.state.count,totalRegistros: this.state.totalRegistros - 1,result:mensaje}))


       this.refrescarItems(aux,this.state.tamPagina)
       //this.setState({count: (this.state.count == this.state.totalRegistros-1)? resultado : this.state.count,totalRegistros: this.state.totalRegistros - 1});
       


    },
      
    render: function () {
     
	const divStyle = {
	  cursor: 'pointer',
	  color:'blue',
	  
	};
        var prods = []
        for (var i=0; i<this.state.items.length; i++) {
            var actual = this.state.items[i]
            var elemento
 
                elemento = <Item key={i}
                                 pos={i}
                                 _id ={actual._id}
                                 nif={actual.nif}
                                 name={actual.name}
                                 age={actual.age}
                                 handleEleminar={this.clickDel}/>
           
            
            prods.push(elemento)
        }
//alert(localStorage.login)
if (localStorage.login && localStorage.password) {
        return <div>
                                         
                                <h1>Lista Usuarios</h1>
                                {this.state.result}
                                <select name="tamPagina" onChange={this.changeTamPage}>
                                    <option value="3">3</option>
                                    <option value="6">6</option>
                                    <option value="9">9</option>
                                </select>
       <div id="tabla">
	   <table className="table table-striped">
	    <thead>
	      <tr>

		<th>Id</th>
		<th>Name</th>
		<th>Accion</th>
	      </tr>
	    </thead>
	    <tbody>
	       {prods}
	    </tbody>
               
           </table>
        <div className="text-center"><i style={divStyle} onClick={this.last}>Anterior</i>&nbsp;&nbsp;&nbsp;&nbsp;<i style={divStyle} onClick={this.next}>Siguiente</i></div>
       </div></div>
	}else{
              return <Home/>
	}
    }
})
