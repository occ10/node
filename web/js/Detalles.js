var React = require('react')
import {Link} from 'react-router'
var API_lista = require('./servicios/API')
var EventBus = require('./servicios/EventBus')

module.exports = React.createClass({

    getInitialState() {

        return {
            usuario: ''
        }
    },
    
    //Justo antes del render cargamos los elementos
    componentWillMount(){
      EventBus.eventEmitter.addListener('detallesItem', this.obtenerElemento)
        
    },

    obtenerElemento: function(nuevo){
        //API_lista.obtenerItem(this.state.id).then(datos => {this.setState({usuario: datos})})
        
       this.setState({usuario: nuevo})
    },
    render: function () {

    //alert('nuevo id '+this.state.usuario._id)
	const divStyle = {
	  cursor: 'pointer',
	  color:'blue',
	  
	};
//alert('state '+ this.state.usuario._id)

        return <div className="detallesItem">
              <span className="nombre">Nombre:{this.state.usuario.name}</span><br/>
               <span className="id">Identificador:{this.state.usuario._id}</span><br/>
              <span className="nif">Nif:{this.state.usuario.nif}</span><br/>
              <div className="age">Edad:
                {this.state.usuario.age}
              </div>
             <Link className="btn btn-primary" to="list" >Ocultar Detalles</Link>
            </div>
    }
})
