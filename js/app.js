
var app = angular.module('ABMangularPHP', ['ui.router', 'satellizer', 'angularFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  
  $authProvider.loginUrl = 'ABM_AngularJs_PHP_persona/PHP/auth.php'; //Ruta del archivo auth que esta en jwt y direcciona a PHP
  $authProvider.tokenName = 'ElNombreDelToken'; //nombre largo
  $authProvider.tokenPrefix = 'Aplicacion'; //sarasa
  $authProvider.authHeader = 'data';

  $stateProvider

      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/inicio.html',
                controller : 'controlInicio'
            })
      .state('persona', {
                url : '/persona',
                abstract:true,
                templateUrl : 'vistas/abstractaPersona.html',
                controller : 'controlPersona'
            })
  
      .state('persona.menu', {
                url: '/menu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaMenu.html',
                        controller : 'controlPersonaMenu'
                    }
                }
            })
      .state('persona.alta', {
                url: '/alta',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaAlta.html',
                        controller : 'controlPersonaAlta'
                    }
                }
            })
      .state('persona.grilla', {
                url: '/grilla',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaGrilla.html',
                        controller : 'controlPersonaGrilla'
                    }
                }
            })
      .state('usuario', {
                url : '/usuario',
                abstract:true,
                templateUrl : 'vistas/abstractaUsuario.html',
                controller : 'controlUsuario'
            })
      .state('usuario.menu', {
                url: '/usermenu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarioMenu.html',
                        controller : 'controlUsuarioMenu'
                    }
                }
            })
      .state('usuario.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarioLogin.html',
                        controller : 'controlUsuarioLogin'
                    }
                }
            })
      .state('usuario.registrarse', {
                url: '/registrarse',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarioRegistrarse.html',
                        controller : 'controlUsuarioRegistrarse'
                    }
                }
            })

             $urlRouterProvider.otherwise('/inicio');
});

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


app.controller('controlPersona', function($scope, $http, $auth) {
   if(!$auth.isAuthenticated())
   {
    $scope.DatoTest="**NO TOKEN**";
    $scope.titulo="Debe iniciar sesion";
   }else{
    $scope.DatoTest="**Menu**";
    $scope.titulo="Inicio y presentacion de la WEB";
   }
    

});
app.controller('controlPersonaAlta', function($scope, $http) {
  $scope.DatoTest="**alta**";

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
 $scope.persona.dni= "444412312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="sinfoto";


  $scope.Guardar=function(){


  	console.log("persona a guardar:");
    console.log($scope.persona);

    /*
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
 	  .then(function(respuesta) {     	
 		     //aca se ejetuca si retorno sin errores      	
      	 console.log(respuesta.data);

    },function errorCallback(response) {     		
     		//aca se ejecuta cuando hay errores
     		console.log( response);     			
 	  });

  */

  }
});

app.controller('controlUsuario', function($scope, $http) {
  $scope.DatoTest="**Menu**";
  $scope.titulo="Inicio y presentacion de la WEB"
});

app.controller('controlUsuarioMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
  $scope.titulo="Inicio y presentacion de la WEB"
});

app.controller('controlUsuarioLogin', function($scope, $http, $auth) {

  $scope.usuario = {};
  $scope.usuario.email = "algo@mail";
  $scope.usuario.password = "claveju66i6u7";

  if($auth.isAuthenticated())
    console.info("token", $auth.getPayload());
  else
    console.info("no token", $auth.getPayload());

  $scope.Login = function(){

    //Esto es una llamada equivalente a $http
    $auth.login($scope.usuario)
    .then(function(response) {
        console.info("correcto", response);

        //CHEQUEO DE SESION ACTIVA O NO
        if($auth.isAuthenticated())
          console.info("token", $auth.getPayload());
        else
          console.info("no token", $auth.getPayload());
      // Redirect user here after a successful log in.
    })
    .catch(function(response) {
        console.info("incorrecto", response);
      // Handle errors here, such as displaying a notification
      // for invalid email and/or password.
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
  
  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.usuario}})
    .then(function(respuesta) {       
       //aca se ejetuca si retorno sin errores        
     console.info("respuesta", respuesta.data);
     $state.go("inicio");

  },function errorCallback(response) {        
      //aca se ejecuta cuando hay errores
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

app.controller('controlPersonaGrilla', function($scope, $http) {
  	$scope.DatoTest="**grilla**";
 	

  $http.get('http://www.mocky.io/v2/57c82b3a1200008404e769ad')
  .then(function(respuesta) {       

         $scope.ListadoPersonas = respuesta.data;
         console.log(respuesta.data);

    },function (error) {
         $scope.ListadoPersonas= [];
        console.log( error);
        
   });
 /*	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
     		
 	 });*/




  /*

          https://docs.angularjs.org/api/ng/service/$http

          the response object has these properties:

        data – {string|Object} – The response body transformed with the transform functions.
        status – {number} – HTTP status code of the response.
        headers – {function([headerName])} – Header getter function.
        config – {Object} – The configuration object that was used to generate the request.
        statusText – {string} – HTTP status text of the response.
            A response status code between 200 and 299 is considered a success
             status and will result in the success callback being called. 
             Note that if the response is a redirect, XMLHttpRequest will 
             transparently follow it, meaning that 
             the error callback will not be called for such responses.
   */
 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);



/*$http.post("PHP/nexo.php",{accion :"borrar",persona:persona},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
.success(function(data, status, headers, config) {
    console.log("bien"+data);
  }).error(function(data, status, headers, config) {
     console.log("mal"+data);
});*/


/*
     $http.post('PHP/nexo.php', 
      headers: 'Content-Type': 'application/x-www-form-urlencoded',
      params: {accion :"borrar",persona:persona})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

*/
 	}




 	$scope.Modificar=function(id){
 		
 		console.log("Modificar"+id);
 	}





});
