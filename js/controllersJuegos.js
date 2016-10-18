angular.module('ABMangularPHP.controllersJuegos', [])

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

