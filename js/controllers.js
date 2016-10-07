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
   /*if(!$auth.isAuthenticated())
   {
    $scope.DatoTest="**NO TOKEN**";
    alert("Debe iniciar sesion!");
    $state.go("inicio");
   }*/

});
app.controller('controlPersonaAlta', function($scope, $http, FileUploader, $state) {
  $scope.DatoTest="**alta**";
  $scope.persona={};
  $scope.persona.nombre;
  $scope.persona.dni;
  $scope.persona.apellido;
  $scope.persona.foto;
  $scope.uploader=new FileUploader({url:'PHP/nexo.php'});

  $scope.Guardar=function(){


    console.log("persona a guardar:");
    console.log($scope.persona);

    //console.info("DATO gasfas: " , JSON.stringify($scope.persona));
    $http.post('http://localhost:8080/ABM_AngularJs_PHP_persona/ws1/alta/' + JSON.stringify($scope.persona))
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.info(respuesta);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.info( response);           
    });
  }

  //$args['id']

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

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(response) {
        console.log("login con github!");
      })
      .catch(function(response) {
        console.info("RESPUESTA",response);
      });
    }

  /*if($auth.isAuthenticated())
    console.info("token", $auth.getPayload());
  else
    console.info("no token", $auth.getPayload());*/

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
    console.log("borrar"+persona.id);
    console.info(persona);

//MANERA DE PASAR UN OBJETO POR POST AL WEB SERVICE
$http.delete('http://localhost:8080/ABM_AngularJs_PHP_persona/ws1/personas/' + JSON.stringify(persona.id))
.success(function(data, status, headers, config) {
    console.info("FUNCIONA: " , data);
    $scope.Traer();
  }).error(function(data, status, headers, config) {
     console.info("FALLA: " , data);
});


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

//CONTROLLERS JUEGOS:
app.controller('controlJuegos', function($scope, $http) {
  $scope.DatoTest="**Juegos**";
});

app.controller('controljuegosMenu', function($scope, $http) {
  $scope.DatoTest="**Menu de Juegos**";
});

app.controller('controlJuegosAdivinaElNumero1', function($scope, $http) {
  
  $scope.contadorIntentos;
  $scope.numeroSecreto = "";
  $scope.numeroIngresado;

  $scope.Comenzar=function(){
    $scope.numeroSecreto = Math.floor((Math.random()*100)+1);
    $scope.contadorIntentos = 0;
    alert($scope.numeroSecreto);
  }

  $scope.Verificar=function(){
    if($scope.numeroIngresado == $scope.numeroSecreto){
      alert("Usted es un ganador!!! y en solo "+$scope.contadorIntentos+" intentos");
    }else if($scope.numeroIngresado > $scope.numeroSecreto){
      $scope.contadorIntentos ++;
      alert("Se paso...");
    }else{
      $scope.contadorIntentos ++;
      alert("Falta...");
    }
  }

});

app.controller('controlJuegosAdivinaElNumero2', function($scope, $http) {
  
  $scope.contadorIntentos;
  $scope.numeroSecreto = "";
  $scope.numeroIngresado;

  $scope.Comenzar=function(){
    //Genero el número RANDOM entre 1 y 100
    $scope.numeroSecreto = Math.floor((Math.random()*100)+1);
    $scope.contadorIntentos = 1;
    alert($scope.numeroSecreto);
  }

  $scope.Verificar=function(){
  
    if($scope.numeroIngresado == $scope.numeroSecreto){
      alert("Usted es un ganador!!! y en solo "+$scope.contadorIntentos+" intentos");
      switch($scope.contadorIntentos){
      case 1:
      alert("usted es un Psíquico");
      break;
      case 2:
      alert("Excelente percepción");
      break;
      case 3:
      alert("Esto es suerte");
      break;
      case 4:
      alert("Excelente técnica");
      break;
      case 5:
      alert("Usted esta en la media");
      break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      alert("Falta técnica");
      break;
      default:
      alert("Afortunado en el amor");
    }
      
    }else if($scope.numeroIngresado > $scope.numeroSecreto){
      $scope.contadorIntentos ++;
      alert("Se paso...");
    }else{
      $scope.contadorIntentos ++;
      alert("Falta...");
    }
  }

});

app.controller('controlJuegosAgilidadAritmetica1', function($scope, $http) {
  
  $scope.PrimerNumero;
  $scope.SegundoNumero;
  $scope.operacion;
  $scope.operadores = "+-*/";
  $scope.respuesta;

  $scope.Comenzar=function(){
    $scope.PrimerNumero= Math.floor((Math.random()*10)+1);
    $scope.SegundoNumero= Math.floor((Math.random()*10)+1);
    $scope.operacion = $scope.operadores.charAt(Math.floor(Math.random() * $scope.operadores.length));
  }

  $scope.Responder=function(){
    var suma = parseInt($scope.PrimerNumero) + parseInt($scope.SegundoNumero);
    var resta = parseInt($scope.PrimerNumero) - parseInt($scope.SegundoNumero);
    var multiplicacion = parseInt($scope.PrimerNumero) * parseInt($scope.SegundoNumero);
    var division = Math.floor(parseInt($scope.PrimerNumero) / parseInt($scope.SegundoNumero));
  
    switch($scope.operacion){
      case '+':
      if($scope.respuesta == suma){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      case '-':
      if($scope.respuesta == resta){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      case '/':
      if($scope.respuesta == division){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      case '*':
      if($scope.respuesta == multiplicacion){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      default:
      alert("Error");
    }
    $scope.Comenzar();
  }

});

app.controller('controlJuegosAgilidadAritmetica2', function($scope, $http) {
  
  $scope.PrimerNumero;
  $scope.SegundoNumero;
  $scope.operacion;
  $scope.operadores = "+-*/";
  $scope.respuesta;

  $scope.Comenzar=function(){
    //var temporizador=setInterval($scope.Responder, 4000);
    $scope.PrimerNumero= Math.floor((Math.random()*10)+1);
    $scope.SegundoNumero= Math.floor((Math.random()*10)+1);
    $scope.operacion = $scope.operadores.charAt(Math.floor(Math.random() * $scope.operadores.length));
  }

  $scope.Responder=function(){
    var suma = parseInt($scope.PrimerNumero) + parseInt($scope.SegundoNumero);
    var resta = parseInt($scope.PrimerNumero) - parseInt($scope.SegundoNumero);
    var multiplicacion = parseInt($scope.PrimerNumero) * parseInt($scope.SegundoNumero);
    var division = Math.floor(parseInt($scope.PrimerNumero) / parseInt($scope.SegundoNumero));
  
    switch($scope.operacion){
      case '+':
      if($scope.respuesta == suma){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      case '-':
      if($scope.respuesta == resta){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      case '/':
      if($scope.respuesta == division){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      case '*':
      if($scope.respuesta == multiplicacion){
        alert("Resultado correcto");
      }else{
        alert("Incorrecto");
      }
      break;
      default:
      alert("Error");
    }
    //$scope.Comenzar();
  }

});

app.controller('controlJuegosPiedraPapelTijera1', function($scope) {
 
  $scope.eleccionMaquina;
  $scope.resultado;

  $scope.Comenzar=function(){
    $scope.eleccionMaquina = Math.floor((Math.random()*3)+1);
    alert($scope.eleccionMaquina);
  }

  $scope.piedra=function(){
    if($scope.eleccionMaquina == 3)
      $scope.resultado="Ganaste!";
    else if($scope.eleccionMaquina == 2)
      $scope.resultado="Perdiste!";
    else
      $scope.resultado="Empate!";
  }

  $scope.papel=function(){
    if($scope.eleccionMaquina == 1)
      $scope.resultado="Ganaste!";
    else if($scope.eleccionMaquina == 3)
      $scope.resultado="Perdiste!";
    else
      $scope.resultado="Empate!";
  }

  $scope.tijera=function(){
    if($scope.eleccionMaquina == 2)
      $scope.resultado="Ganaste!";
    else if($scope.eleccionMaquina == 1)
      $scope.resultado="Perdiste!";
    else
      $scope.resultado="Empate!";
  }

});

app.controller('controlJuegosPiedraPapelTijera2', function($scope) {
  $scope.eleccionMaquina;
  $scope.ganadas=0;
  $scope.perdidas=0;
  $scope.empatadas=0;

  $scope.resultado;

  $scope.Comenzar=function(){
    $scope.eleccionMaquina = Math.floor((Math.random()*3)+1);
    alert($scope.eleccionMaquina);
  }

  $scope.piedra=function(){
    if($scope.eleccionMaquina == 3){
      $scope.resultado="Ganaste!";
      $scope.ganadas++;
    }
    else if($scope.eleccionMaquina == 2){
      $scope.resultado="Perdiste!";
      $scope.perdidas++;
    }
    else{
      $scope.resultado="Empate!";
      $scope.empatadas++;
    }
    $scope.Comenzar();
  }

  $scope.papel=function(){
    if($scope.eleccionMaquina == 1){
      $scope.resultado="Ganaste!";
      $scope.ganadas++;
    }
    else if($scope.eleccionMaquina == 3){
      $scope.resultado="Perdiste!";
      $scope.perdidas++;
    }
    else{
      $scope.resultado="Empate!";
      $scope.empatadas++;
    }
    $scope.Comenzar();
  }

  $scope.tijera=function(){
    if($scope.eleccionMaquina == 2){
      $scope.resultado="Ganaste!";
      $scope.ganadas++;
    }
    else if($scope.eleccionMaquina == 1){
      $scope.resultado="Perdiste!";
      $scope.perdidas++;
    }
    else{
      $scope.resultado="Empate!";
      $scope.empatadas++;
    }
    $scope.Comenzar();
  }

});


app.controller('controlJuegosReflejosDaltonicos1', function($scope) {
  $scope.ColorSecreto;
  $scope.tiempoInicio;
  $scope.resultado;

  $scope.Comenzar=function(){
    $scope.tiempoInicio = new Date();
    $scope.tiempoInicio = $scope.tiempoInicio.getTime();
    var aux = Math.floor((Math.random()*7)+1);
    switch (aux){
      case 1:
      $scope.ColorSecreto = "azul";
      break;
      case 2:
      $scope.ColorSecreto = "amarillo";
      break;
      case 3:
      $scope.ColorSecreto = "marron";
      break;
      case 4:
      $scope.ColorSecreto = "verde";
      break;
      case 5:
      $scope.ColorSecreto = "celeste";
      break;
      case 6:
      $scope.ColorSecreto = "rojo";
      break;
      case 7:
      $scope.ColorSecreto = "rosa";
      break;
    }
  }

  $scope.Responder=function(colorParametro){
    var tiempoFin = new Date();
    tiempoFin = tiempoFin.getTime();
    if($scope.ColorSecreto == colorParametro){
      $scope.resultado = tiempoFin - $scope.tiempoInicio + " milisegundos";
      $scope.Comenzar();
    }
  }

});

