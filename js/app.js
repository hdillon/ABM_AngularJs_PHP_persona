
var app = angular.module('ABMangularPHP', ['ui.router', 'ABMangularPHP.controllers', 'satellizer', 'angularFileUpload', 'validation.match']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  
  $authProvider.loginUrl = 'ABM_AngularJs_PHP_persona/PHP/auth.php'; //Ruta del archivo auth que esta en jwt y direcciona a PHP
  $authProvider.tokenName = 'ElNombreDelToken'; //nombre largo
  $authProvider.tokenPrefix = 'Aplicacion'; //sarasa
  $authProvider.authHeader = 'data';

  $authProvider.github({
      clientId: '08fc74e99837e2f15086',
      url: '/auth/github',
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      //redirectUri: window.location.origin,
      redirectUri: "http://localhost:8080/ABM_AngularJs_PHP_persona/index.html", // Esta URL debe coincidir con la seteada en la pág. de GitHub: opción: Authorization callback URL
      optionalUrlParams: ['scope'],
      scope: ['user:email'],
      scopeDelimiter: ' ',
      oauthType: '2.0',
      popupOptions: { width: 1020, height: 618 }
    });

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
      .state('juegos', {
                url : '/juegos',
                abstract:true,
                templateUrl : 'vistas/abstractaJuegos.html',
                controller : 'controlJuegos'
            })
      .state('juegos.menu', {
                url: '/juegosmenu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegosMenu.html',
                        controller : 'controljuegosMenu'
                    }
                }
            })
      .state('juegos.adivinaelnumero1', {
                url: '/adivinaelnumero1',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/AdivinaElNumero1.html',
                        controller : 'controlJuegosAdivinaElNumero1'
                    }
                }
            })
      .state('juegos.adivinaelnumero2', {
                url: '/adivinaelnumero2',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/AdivinaElNumero2.html',
                        controller : 'controlJuegosAdivinaElNumero2'
                    }
                }
            })
      .state('juegos.agilidadaritmetica1', {
                url: '/agilidadaritmetica1',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/AgilidadAritmetica1.html',
                        controller : 'controlJuegosAgilidadAritmetica1'
                    }
                }
            })
      .state('juegos.agilidadaritmetica2', {
                url: '/agilidadaritmetica2',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/AgilidadAritmetica2.html',
                        controller : 'controlJuegosAgilidadAritmetica2'
                    }
                }
            })
      .state('juegos.piedrapapeltijera1', {
                url: '/piedrapapeltijera1',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/PiedraPapelTijera1.html',
                        controller : 'controlJuegosPiedraPapelTijera1'
                    }
                }
            })
      .state('juegos.piedrapapeltijera2', {
                url: '/piedrapapeltijera2',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/PiedraPapelTijera2.html',
                        controller : 'controlJuegosPiedraPapelTijera2'
                    }
                }
            })
      .state('juegos.reflejosdaltonicos', {
                url: '/reflejosdaltonicos',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegos/ReflejosDaltonicos1.html',
                        controller : 'controlJuegosReflejosDaltonicos1'
                    }
                }
            })

             $urlRouterProvider.otherwise('/inicio');
});

