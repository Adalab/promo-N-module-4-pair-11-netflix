const express = require('express');
const cors = require('cors');
//importar base de datos
const Database = require("better-sqlite3");
//configurar bd
const db = new Database('./src/db/database.db', {
  verbose: console.log
})

//crear el servidor
const server = express();

//configurar el servidor
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

//arrancar el servidor
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//configurar servidor de estáticos
const staticServerPath = "./src/public-react"; server.use(express.static(staticServerPath));

///API ENDPOINTS///

//get /login ? email & pass
server.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  if (!email || !pass) {
    res.sendStatus(404)
  } else {
    //1-declarar mi query
    const query = db.prepare("SELECT * FROM users WHERE email=? and pass=?");
    //2-ejecutar la query
    const foundUser = query.get(email, pass);

    if (foundUser !== undefined) {
      res.json({ userId: foundUser.id });
    } else {
      res.json({ error: "Usuario no encontrado " });
    }
  }
})

//películas de netflix
server.get("/movies", (req, res) => {
  //fake data - base de datos
  //1-declarar mi query
  const query = db.prepare("SELECT * FROM movies");
  //2-ejecutar mi query
  const responseBD = query.all();
  
  console.log(responseBD);
  res.json(responseBD);
})
//Api Endpoints
//endpoint url params
server.get('/movies/:moviesId', (req, res) => {
  const moviesId = [
  ];
  console.log('mostrar películas por Id', req.params.moviesId);
  const foundMovie = movies.find(movie =>
    movie.id === req.params.moviesId);

    //pasarsela a la plantilla
    res.render("movies", foundMovie);


  console.log(foundMovie);
})

//use - imágenes
const friendsImage = "./src/public-react/movies-images/friends.jpg"; server.use(express.static(friendsImage));
//buscar en ruta: http://localhost:4000/movies-images/friends.jpg

//use - imágenes
const GambitoImage = "./src/public-react/movies-images/gambito-de-dama.jpg"; server.use(express.static(GambitoImage));

//post - crear usuario - body params
server.post("/user/add", (req, res) => {
  console.log(req.body);
  users.push({ name: req.body.name });
  //res.sendStatus(200); 
  res.json({
    result: "user created"
  });
})
// API



