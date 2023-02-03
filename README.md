<h1 align="center">Hola 👋, Soy Ignacio</h1>

<h2 align="left">Índice</h2>

1. Descripción del proyecto
2. Credenciales de administrador, archivo .env y link de importación de Postman
3. Frontend
4. Variables de entorno - frontend
5. Backend
6. Estructura de respuestas - backend
7. Modo Postman


<h2 align="left">1. Descripción del proyecto</h2>
<p align="left">4DEVS ! es una tienda de equipamiento integral y saludable, para todo tipo de oficinas.</p>
<p align="left">Su frontend se encuentra desarrollado con React.js usando Vite.js. Y su backend con Node.js usando Express.js</p>

<h3 align="left">Lenguajes y herramientas:</h3>
<p align="left"> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://mariadb.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg" alt="mariadb" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a>  </p>

<h3 align="left">Características:</h3>

- Se ha implementado el patrón de arquitectura de software: SOA.
- Se ha implementado los patrones de diseño de software: Singleton y Factory.
- Se ha implementado entornos de desarrollo: development y production (Tanto en el cliente como en el servidor).
- Lógica de carro de compras.
- Lógica de verificación de stock (Cuando se agrega un producto al carro de compras y al momento del checkout).
- Lógica de autenticación de usuario basada en sesiones (Tanto en el cliente como en el servidor).
- Lógica de autorización de acceso (Tanto en el cliente como en el servidor).
- Lógica de envío de email (Cuando un nuevo usuario se registra y cuando se genera una orden de compra).
- Lógica de CORS con lista blanca.
- Lógica de redimensionado de imágenes.
- Lógica de filtrado y ordenamiento de productos (Del lado del cliente).
- Panel de administración (Solo puede acceder el administrador. Los datos son estáticos).
- Modo Postman.

[![4devs-shop.jpg](https://i.postimg.cc/qqqxYy46/4devs-shop.jpg)](https://postimg.cc/hQFmQJJK)

<h3 align="left">Menú de usuario:</h3>

<p align="left">Al darle click a su avatar, aparecerá el siguiente menú</p>

- Admin (Solo aparecerá si el usuario tiene rol de administrador)
- Orders
- Logout

[![user-menu.jpg](https://i.postimg.cc/xdxvY4Nr/user-menu.jpg)](https://postimg.cc/B8FLBNCN)

<h2 align="left">2. Credenciales de administrador, archivo .env y link de importación de Postman</h2>

<p align="left">Esta información se encuentra en una carpeta compartida de google drive.</p>
<p align="left">El link a dicha carpeta ha sido enviado en la descripción de la entrega, dentro de la plataforma de CoderHouse.</p>


<h2 align="left">3. Frontend</h2>

<h3 align="left">Instalación:</h3>

```bash
    cd ./src/react
    yarn install
```

<h3 align="left">Ejecución:</h3>

```bash
    yarn dev
```

<p align="left">IMPORTANTE: En la primera ejecución , va a aparece una ventana solicitando agregar un certificado SSL. ACEPTARLO.</p>
<p align="left">El certificado es necesario para que Vite.js pueda crear un servidor HTTPS donde montar la aplicación de React.</p>

<p align="left">NOTA: Vite.js creará el servidor en el puerto 8081</p>


<h2 align="left">4. Variables de entorno - frontend</h2>

<h3 align="left">Ubicación:</h3>

<p align="left">Archivo .env dentro de la carpeta de react.</p>

<h3 align="left">Listado de variables:</h3>

- ENV -> development || production
- SERVER_URL_DEV
- SERVER_URL_PROD

<p align="left">IMPORTANTE: Cambiar el puerto de SERVER_URL_DEV, si el backend local usa un puerto diferente al 8080</p>
<p align="left">IMPORTANTE: Si ENV es production, React va a realizar solicitudes al server en Heroku. Y necesita estar montando sobre un servidor HTTPS (Leer siguiente apartado)</p>

<h3 align="left">Variable ENV con valor: production (Heroku):</h3>

<p align="left">Para poder hacer solicitudes a Heroku es necesario que Vite.js cree un servidor HTTPS !</p>

1. Matar el servidor actual de Vite.js.
2. Ir a la carpeta de react y acceder al archivo "vite.config.js".
3. Setear el atributo https en true.
4. Volver a lanzar el react.

```JavaScript
    export default defineConfig({
        server: {
            https: true, // IMPORTANTE PARA PRODUCCION !
            port: 8081,
            strictPort: true,
        },
        plugins: [react(), mkcert()],
    })
```

<h2 align="left">5. Backend</h2>

<h3 align="left">Instalación:</h3>

```bash
    cd ./src
    npm install
```

<h3 align="left">Ejecución:</h3>

```bash
    npm run start
```

<p align="left">O usando Nodemon:</p>

```bash
    npm run dev
```

<h2 align="left">6. Estructura de respuestas - backend</h2>

<h3 align="left">Respuesta exitosa:</h3>

```JavaScript
    res.json({ 
        success: true,
        data: { products } // Atributo opcional
    });
```

<h3 align="left">Respuesta fallida:</h3>

```JavaScript
    res.json({
        success: false,
        error: {
            code: '-2',
            description: "Insufficient stock",
            value: checkStock.value // Atributo opcional
        }
    });
```

<h4 align="left">Respuesta fallida - Códigos de error:</h4>

| code | descripción del error |
| ------------- | ------------- |
| -1  | Error por falta de implementación |
| -2  | Error de inputs (Validación / Verificación) |
| -3  | Error de autenticación |
| -4  | Error de autorización |


<h2 align="left">7. Modo Postman</h2>

<p align="left">Es la forma de evitar los middlewares de ruta que se encargan de verificar autenticación y autorización</p>

<h3 align="left">Activación:</h3>

<p align="left">Cambiando el valor de la variable de entorno del servidor</p>

```bash
    USE_POSTMAN=true
```
<p align="left">IMPORTANTE: Usar solo si NODE_ENV es development.</p>