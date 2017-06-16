var React = require('react')
import {Link} from 'react-router'
var EventBus = require('./servicios/EventBus')
var API_lista = require('./servicios/API')
module.exports = React.createClass({
    verDetalles : function (evento) {
       this.props.handleVerDetalles(this.props.pos)
    },   
    eleminar : function (evento) {
            
       this.props.handleEleminar(this.props._id)
    },

    detalles : function (evento) {
            
      // this.props.handleUpdate(this.props.pos)

    //JSONObject json = new JSONObject()
//json.put('id', this.props._id)
      var nuevo = {
          
            id: this.props._id,
            nif: this.props.nif,
           name: this.props.name,
           age: this.props.age
       }

     API_lista.obtenerItem(nuevo).then(function(datos){     
      EventBus.eventEmitter.emitEvent('detallesItem', [datos])
     })
    },
    update : function (evento) {
      var nuevo = {          
            id: this.props._id,
            nif: this.props.nif,
           name: this.props.name,
           age: this.props.age
       }

     API_lista.obtenerItem(nuevo).then(function(datos){     
       EventBus.eventEmitter.emitEvent('updateItem', [datos])
     })
    },
    render: function () {

const divStyle = {
  cursor: 'pointer',
  color:'blue',
  
};

     return <tr>
        <td>{this.props._id}</td>

        <td>{this.props.name}</td>
    
        <td>

            <i style={divStyle}><Link to='detalles' onClick={this.detalles}>Detalles Usuario</Link></i>&nbsp;&nbsp;


            
           <i style={divStyle}><Link to='updateUsuario' onClick={this.update}>Actualizar Usuario</Link></i>&nbsp;&nbsp;

            <i  style={divStyle} onClick={this.eleminar}>Eliminar Usuario</i>

        </td>
      </tr>


    }
})

