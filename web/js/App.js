
var React = require('react')
import {Link} from 'react-router'

var App = React.createClass({
    
    getInitialState : function () {

      return {isLoggedIn: false}
    },
    logOut : function () {
       
      localStorage.clear();
      
    },
  handleLoginClick : function () {
    this.setState({isLoggedIn: true});
  },

  handleLogoutClick : function () {
    this.setState({isLoggedIn: false});
  },


    render: function () {


   var menu=''
   var login=''
    if (localStorage.login && localStorage.password) {
        menu = <ul className="nav navbar-nav">
                               <li><Link to="about">about</Link></li>
		               <li id="list" ><Link to="list">list</Link></li>
		               <li id="newUser" ><Link to="nuevoUsuario">Nuevo Usuario</Link></li>		        
		               
                </ul>;
        login=<li><Link to="/" onClick={this.logOut}>Log out</Link></li>
    }

		return <div className="app">
		        <div className="header">

		        <nav className="navbar navbar-inverse">
		          <div className="container-fluid">
		            <ul className="nav navbar-nav">
		                            
                               {menu}
		       
		           </ul>
		           <ul className="nav navbar-nav navbar-right">
			         {login}
			   </ul>
		</div>
		</nav>
         </div>

         <div className="container">
          {this.props.children}
        </div>

        </div>;
    }
})
module.exports = App



