# PlanFlow

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.13.

## Desarrollo

Debe instalarse los paquetes necesarios, para eso correr:

```bash
npm install
```

Debe sustituirse las llaves necesarias (apiKey y openAiApiKey) en los [ficheros de ambiente](src/environments/environment.ts)

Para levantar el servidor local, correr:

```bash
ng serve
```

Cuando el servidor se encuentre corriendo, abrir un navegador e ir a la dirección `http://localhost:4200/`.

## Construcción

Para construir el proyecto, ejecutar:

```bash
ng build
```

Esto construirá el proyecto y almacenará el resultado de la construcción en la carpeta `dist/`.

## Ejecutar las pruebas

Para ejecutar las pruebas con [Karma](https://karma-runner.github.io) , debe usar el siguiente comando:

```bash
ng test
```

## Flujo de trabajo

Al ejecutar la aplicación por primera vez se debe dar acceso a la misma

![Inicio de sesión](docs\images\initial.png "Inicio de sesión")

Al habilitar el acceso sale la página de permiso de Trello

![Habilitar permiso](docs\images\enable_access.png "Habilitar permiso")

Si todo funciona correcto la aplicación iráa a la página inicial

![Página Inicio](docs\images\dashboard.png "Página Inicio")

Se puede navegar entonces a los tableros disponibles

![Tableros](docs\images\boards.png "Tableros")

Usando la acción de ver detalles vamos a ver las listas asociadas al tablero

![Listas](docs\images\lists.png "Listas")

Podemos obtener las respuestas a las preguntas usando los correspondientes botones. Ejemplo de una respuesta

![Respuesta OpenAI](docs\images\openAI.png "Respuesta OpenAI")

## Tablero usado para las pruebas

https://trello.com/b/wm5tpQXh/prueba-de-tablero
