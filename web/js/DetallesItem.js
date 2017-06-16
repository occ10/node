var React = require('react')

module.exports = React.createClass({
    ocultarDetalles: function () {
      this.props.handleOcultarDetalles(this.props.pos)
    },
    render: function () {

const divStyle = {
  cursor: 'pointer',
  color:'blue',
  
};
        return <div className="detallesItem">
              <span className="nombre">Nombre:{this.props.name}</span><br/>
               <span className="id">Identificador:{this.props._id}</span><br/>
              <span className="nif">Nif:{this.props.nif}</span><br/>
              <div className="age">Edad:
                {this.props.age}
              </div>
              <i  style={divStyle} onClick={this.ocultarDetalles}>Ocultar detalles</i>
            </div>
    }
})
