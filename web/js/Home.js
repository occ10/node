
var React = require('react')
import {Link} from 'react-router'

var Home = React.createClass({


 getInitialState() {
      return {
          resultado: '',
      }
    },
    render: function () {
        
        if(localStorage.login)
          return  <div > <h1>hola {localStorage.login} Gestion de casas y coches para la comparticion entre los usuarios</h1>
                </div>
        else
  
         return  <div > <h2> Gestion de casas y coches para la comparticion entre los usuarios <Link to="/">Iniciar Sesion</Link></h2>
                </div>
        
        
    }

    
})
module.exports = Home
