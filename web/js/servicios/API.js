
module.exports  = {

    API_URL : 'http://localhost:3000/api/user',
     auth : "Basic " + new Buffer(localStorage.login + ":" + localStorage.password).toString("base64"),
     
    obtenerCollection: function (item) {
       return fetch('http://localhost:3000/api/collection/user/'+item.count+'/'+item.tamPag)
        //return fetch('http://localhost:3000/api/collection/user/'+id)
            .then(function(response) {
                if (response.ok){
                      //alert(response.json())
                    return response.json()
                     
                  }
            }).catch(function(error){
                   alert(error);
                   //console.log('FAIL!!')
                   console.log(error)
               })
    },

    obtenerItems: function () {

        return fetch(this.API_URL,{
              
            })
            .then(function(response) {
                if (response.ok){
                       
                    return response.json()
                     
                  }
            }).catch(function(error){
                   alert(error);
                   //console.log('FAIL!!')
                   console.log(error)
               })
    },obtenerItem: function (item) {
         
        return fetch(this.API_URL+'/id/'+item.id,{

              headers: {
                      'Authorization' : this.auth
                      
                   },
            }).then(function(response) {
                if (response.ok){
                       
                    return response.json()
                     
                  }
            }).catch(function(error){
                   alert(error);
                   //console.log('FAIL!!')
                   console.log(error)
               })
    },
    addItem: function (item) {
              //alert(item.nif);
        return fetch(this.API_URL, {

                   method: 'POST',
                   headers: {
                      'Authorization' : this.auth,
                      'Content-type':'application/json'
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok){
         
                      return true
                    }
                     return false
               })
                .catch(function(error){
                     //alert(error);
                   //console.log('FAIL!!')
                   console.log(error)
               })
    },

    UpdateItem: function (item) {
              //alert(item.nif);
        return fetch(this.API_URL+'/id/'+item._id, {

                   method: 'PUT',
                   headers: {
                      'Authorization' : this.auth,
                      'Content-type':'application/json'
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok){
                        
                      return true
                   }
                     return false
               })
                .catch(function(error){
                     //alert(error);
                   //console.log('FAIL!!')
                   console.log(error)
               })
    },

    DeleteItem: function (item) {
              
        return fetch(this.API_URL+'/id/'+item._id, {

                   method: 'DELETE',
                   headers: {
                      'Authorization' : this.auth,
                      'Content-type':'application/json'
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok)
                      return true
   
                      return false
               })
                .catch(function(error){
                     //alert(error);
                   //console.log('FAIL!!')
                   console.log(error)
               })
    },

    Loging: function (item) {

              var username = item.login
              var password = item.password
           

        return fetch('http://localhost:3000/api/user/login', {
                    method: 'POST',
                    
                   headers: {
                      
                      'Content-type':'application/json'
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                     
                   if (respuesta.ok){
                       
                      localStorage["login"] = username
                      localStorage["password"] = password
                      //alert(localStorage.login);
                      //return respuesta.json()
                    return true;
                   }
                     return false;
               })
                .catch(function(error){
                     window.stop();
                     //alert(error);

                   //console.log('FAIL!!')
                   console.log(error)
               })
    }

}
