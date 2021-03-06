<?php
header('Access-Control-Allow-Origin: *');  
/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require '../PHP/clases/Personas.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

//TRAER LISTA DE OBJETOS
$app->get('/personas[/]', function ($request, $response, $args) {
    $datos = Persona::TraerTodasLasPersonas();
    $response->write(json_encode($datos))   ;//INTERNAL SERVER ERROR 500 -> Porque le es6taba devolviendo una referencia a memoria del servidor (hay que pasar un "string" del objeto transformado a json!!)
    //$response->write("Lista de usuarios");
    
    return $response;
});

$app->get('/usuario[/{id}[/{name}]]', function ($request, $response, $args) {
    $response->write("Datos usuario ");
    var_dump($args);
    return $response;
});
/* FORMA DE RECIBIR POR PARAMETROS UN OBJETO EN POST
    POST: Para crear recursos */
$app->post('/alta/{objeto}', function ($request, $response, $args) {
    $persona = json_decode($args['objeto']);
    $datos = Persona::InsertarPersona($persona);
    $response->write($datos);
    //$response->write("Welcome to Slim!");

    //$datos = Persona::InsertarPersona();

    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/modificar/{objeto}', function ($request, $response, $args) {
    $persona = json_decode($args['objeto']);
    $datos = Persona::ModificarPersona($persona);
    $response->write($datos);
    //var_dump($args);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/personas/{id}', function ($request, $response, $args) {
    $datos = Persona::BorrarPersona($args['id']);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
