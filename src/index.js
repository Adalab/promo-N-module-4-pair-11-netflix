const express = require('express');
const cors = require('cors');
const Database = require("better-sqlite3");
const db = new Database('./src/db/database.db', {
  verbose: console.log
})


//CREAR EL SERVIDOR
const server = express();

//CONFIGURAR EL SERVIDOR
server.use(cors());
server.use(express.json());

//ARRANCAR EL SERVIDOR
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//CONFIGURAR SERVIDOR DE ESTÁTICOS
const staticServerPath = "./src/public-react"; server.use(express.static(staticServerPath));

///API ENDPOINTS///
//GET - PELÍCULAS
server.get("/movies", (req, res) => {

  const response = {
    success: true,
    movies: [
      {
        id: '1',
        title: 'Gambita de dama',
        gender: 'Drama',
        image: friendsImage
      },
      {
        id: '2',
        title: 'Friends',
        gender: 'Comedia',
        image: GambitoImage
      }
    ]
  }
})


server.get("/movies", (req, res) => {
  //console.log("Peticion a la ruta GET /movies");
  //console.log(req.query);
  //1-Declarar mi query
  const query = db.prepare("SELECT * FROM movies");
  //2-Ejecutar mi query
  const responseBD = query.all();
  console.log(responseBD);
  res.json(responseBD);
})

server.get('/movies/:moviesId', (req, res) => {
  const moviesId = [
  ];
  console.log('mostrar películas por Id', req.params.moviesId);
  const foundMovie = movies.find(movie =>
    movie.id === req.params.moviesId

  )
  console.log(foundMovie);
})

//USE - IMÁGENES
const friendsImage = "./src/public-react/movies-images/friends.jpg"; server.use(express.static(friendsImage));
//buscar en ruta: http://localhost:4000/movies-images/friends.jpg

//USE - IMÁGENES
const GambitoImage = "./src/public-react/movies-images/gambito-de-dama.jpg"; server.use(express.static(GambitoImage));

//POST - CREAR USUARIO - BODY PARAMS
server.post("/user/add", (req, res) => {
  console.log(req.body);
  users.push({ name: req.body.name });
  //res.sendStatus(200); 
  res.json({
    result: "user created"
  });
})
// API



