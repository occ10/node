var React = require('react')
var ReactDOM = require('react-dom')

import { Router, Route, Link,hashHistory, browserHistory, IndexRoute  } from 'react-router'

var Lista = require('./Lista')
var NuevoItem = require('./NuevoItem')
var UpdateItem = require('./UpdateItem')
var DeleteItem = require('./DeleteItem')
var Login = require('./Login')
var App = require('./App')
var Home = require('./Home')
var About = require('./About')
var Detalles = require('./Detalles')

ReactDOM.render((
   <Router history = {hashHistory}>      
      <Route path = "/" component = {App}>
       <IndexRoute component = {Login} />
         <Route path = "about" component = {About} />
         <Route path = "list" component = {Lista} />
         <Route path = "nuevoUsuario" component = {NuevoItem} />
         <Route path = "updateUsuario" component = {UpdateItem} />
         <Route path = "detalles" component = {Detalles} />
         
      </Route>
   </Router>
	
), document.getElementById('componenteLogin'))
