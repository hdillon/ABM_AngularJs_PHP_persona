angular.module('ABMangularPHP.controllers', [])

app.controller('controlPersonaMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";

});

app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});
app.controller('controlInicio', function($scope, $http) {
  $scope.DatoTest="**Menu**";
  $scope.titulo="Inicio y presentacion de la WEB";
  //TENGO QUE VALIDAR SI ESTA AUTENTICADO
/*  if($auth.isAuthenticated())
    //muestro los botones para que ingrese al sistema
  else
    //le pido que se loguee*/
  
});


app.controller('controlPersona', function($scope, $http, $auth, $state) {

});


app.controller('controlPersonaAlta', function($scope, $http, FileUploader, $state) {
  $scope.persona={};
  $scope.persona.nombre = "Horacio";
  $scope.persona.dni = 34551422;
  $scope.persona.apellido = "Dillon";
  $scope.persona.edad = 27;
  $scope.persona.correo = "a@a";
  $scope.persona.foto = "pordefecto.jpg";
  $scope.uploader=new FileUploader({url:'PHP/nexo.php'});

  $scope.Guardar=function(){
    console.log("persona a guardar:");
    console.log($scope.persona);
    $http.post('http://localhost:8080/ABM_AngularJs_PHP_persona/ws1/alta/' + JSON.stringify($scope.persona))
    .then(function(respuesta) {        
         console.info(respuesta);
         $state.go('persona.grilla');
    },function errorCallback(response) {        
        console.info( response);           
    });
  }

  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    //OBTENGO EL NOMBRE DE LA FOTO EN EL MOMENTO DEL UPLOAD:
    console.info("ITEM", item._file.name);
    $scope.persona.foto = item._file.name;
    $http.post('PHP/nexo.php', { datos: {accion :"uploadFoto",persona:$scope.persona}})
    .then(function(respuesta) {         
     console.info("respuesta", respuesta.data);
     //$scope.persona.foto = "pordefecto.jpg";
     //console.info("Ya guardé el archivo.", item, response, status, headers);
  },function errorCallback(response) {        
      console.log( response);   
      //$scope.persona.foto = "pordefecto.jpg";        
    });
    
  };

});



app.controller('controlPersonaModificar', function($scope, $http, FileUploader, $state, $stateParams) {
  console.info("PARAMS", $stateParams.objPersona);
  $scope.persona={};
  $scope.persona.id = Number($stateParams.objPersona.id);
  $scope.persona.nombre = $stateParams.objPersona.nombre;
  $scope.persona.dni = Number($stateParams.objPersona.dni);
  $scope.persona.apellido = $stateParams.objPersona.apellido;
  $scope.persona.foto = "pordefecto.jpg";
  $scope.uploader=new FileUploader({url:'PHP/nexo.php'});

  $scope.Modificar=function(){
    console.log("persona a Modificar:");
    console.log($scope.persona);
    $http.put('http://localhost:8080/ABM_AngularJs_PHP_persona/ws1/modificar/' + JSON.stringify($scope.persona))
    .then(function(respuesta) {        
         console.info("MODIFICÓ BIEN", respuesta);
         $state.go('persona.grilla');
    },function errorCallback(response) {        
        console.info("MODIFICÓ MAL", response);           
    });
  }

  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    //OBTENGO EL NOMBRE DE LA FOTO EN EL MOMENTO DEL UPLOAD:
    console.info("ITEM", item._file.name);
    $scope.persona.foto = item._file.name;
    $http.post('PHP/nexo.php', { datos: {accion :"uploadFoto",persona:$scope.persona}})
    .then(function(respuesta) {         
     console.info("respuesta", respuesta.data);
     //$scope.persona.foto = "pordefecto.jpg";
     //console.info("Ya guardé el archivo.", item, response, status, headers);
  },function errorCallback(response) {        
      console.log( response);   
      //$scope.persona.foto = "pordefecto.jpg";        
    });
    
  };

});


app.controller('controlUsuario', function($scope, $http) {

});


app.controller('controlUsuarioMenu', function($scope, $http) {

});


app.controller('controlUsuarioLogin', function($scope, $http, $auth) {
  $scope.usuario = {};
  $scope.usuario.email = "algo@mail";
  $scope.usuario.password = "claveju66i6u7";

  $scope.loginFirebaseYgitHub = function() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.info("RESULT", result);
    }).catch(function(error) {
      console.info("ERROR", error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
  }

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(response) {
        console.log("login con github!");
      })
      .catch(function(response) {
        console.info("RESPUESTA",response);
      });
    }

  $scope.Login = function(){
    $auth.login($scope.usuario)
    .then(function(response) {
        console.info("correcto", response);
        if($auth.isAuthenticated())
          console.info("token", $auth.getPayload());
        else
          console.info("no token", $auth.getPayload());
    })
    .catch(function(response) {
        console.info("incorrecto", response);
    });
    
  }

});

app.controller('controlUsuarioRegistrarse', function($scope, $http, FileUploader, $state) {
  $scope.DatoTest="**Menu**";
  $scope.titulo="Inicio y presentacion de la WEB";
  $scope.usuario={};
  $scope.usuario.nombre= "" ;
  $scope.usuario.dni= "" ;
  $scope.usuario.apellido= "" ;
  $scope.usuario.foto="pordefecto.png";
  $scope.uploader=new FileUploader({url:'PHP/nexo.php'});
  $scope.lenguajes = [{
          'id':'1',
          'name':'Java'
        },{
          'id':'2',
          'name':'C#'
        },{
          'id':'3',
          'name':'Python'
        }];
  $scope.LenguajesCount = 0;

  $scope.countCheck = function(lenguaje){
    if(lenguaje.checked){
      $scope.LenguajesCount--;
    }else{
      $scope.LenguajesCount++;
    }
  }
  
  $scope.uploader.onSuccessItem=function(item, response, status, headers){
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.usuario}})
    .then(function(respuesta) {           
     console.info("respuesta", respuesta.data);
     $state.go("inicio");
  },function errorCallback(response) {        
      console.log( response);           
    });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };

  $scope.Guardar=function(){
    console.log($scope.uploader.queue);
      if($scope.uploader.queue[0]!=undefined)
      {
        var nombreFoto = $scope.uploader.queue[0]._file.name;
        $scope.usuario.foto=nombreFoto;
      }
      $scope.uploader.uploadAll();
      console.log("usuario a guardar:");
      console.log($scope.usuario);
  }

});

app.controller('controlPersonaGrilla', function($scope, $http, $state) {
    $scope.DatoTest="**grilla**";
  
  /*$http.get('http://www.mocky.io/v2/57c82b3a1200008404e769ad')
  .then(function(respuesta) {       

         $scope.ListadoPersonas = respuesta.data;
         console.log(respuesta.data);

    },function (error) {
         $scope.ListadoPersonas= [];
        console.log( error);
        
   });*/

  $scope.Traer=function(){
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
    $http.get('http://localhost:8080/ABM_AngularJs_PHP_persona/ws1/personas')
    .then(function(respuesta) {       
      console.info("RESPUESTA", respuesta);
           $scope.ListadoPersonas = respuesta.data;
           console.log(respuesta.data);
      },function errorCallback(response) {
           $scope.ListadoPersonas= [];
          console.log( response); 
     });
  }

  $scope.Traer();

  $scope.Borrar=function(persona){
    $http.delete('http://localhost:8080/ABM_AngularJs_PHP_persona/ws1/personas/' + JSON.stringify(persona.id))
    .success(function(data, status, headers, config) {
        console.info("FUNCIONA: " , data);
        $scope.Traer();
      }).error(function(data, status, headers, config) {
         console.info("FALLA: " , data);
    });
  }

  $scope.Modificar=function(persona){
    $state.go('persona.modificar', {objPersona:persona});
  }

});
