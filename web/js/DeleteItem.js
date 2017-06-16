var React = require('react')
var API_lista = require('./servicios/API')
var EventBus = require('./servicios/EventBus')

var DeleteItem = React.createClass({
    clickDel: function () {
      
       var nuevo = {
          
           _id: this.campoId.value,          

       }

       API_lista.DeleteItem(nuevo).then(function(datos){
           //EventBus.eventEmitter.emitEvent('nuevoItem', [nuevo])
       })
            
    },
    render: function () {
        return <div>
            <h1>Borrar Usuario</h1>
            <input type="text" placeholder="id..."
                   ref={(campo)=>{this.campoId=campo}}/> <br/>

           
            <button onClick={this.clickDel}>Borrar</button>
        </div>
    }
})
module.exports = DeleteItem
