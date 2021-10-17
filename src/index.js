const express = require('express');
const cors = require('cors');
const Database = require("better-sqlite3"); 
const db = new Database('./src/db/database.db', { 
  verbose: console.log
 })

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//create static server
const staticServerPath = "./src/public-react"; server.use(express.static(staticServerPath));


const staticServerPathImagesFriends = "./src/public-react/movies-images/friends.jpg"; server.use(express.static(staticServerPathImagesFriends));

//buscar en ruta: http://localhost:4000/movies-images/friends.jpg

const staticServerPathImagesGambito = "./src/public-react/movies-images/gambito-de-dama.jpg"; server.use(express.static(staticServerPathImagesGambito));

//body params
server.post("/user/add", (req, res) => {
  console.log(req.body);
  users.push({ name: req.body.name });
  //res.sendStatus(200); 
  res.json({
    result: "user created"
  });
})

server.post("/login", (req, res)=>{
  const email = req.body.email; 
  const pass = req.body.pass; 

  if(!email || !pass){
      res.sendStatus(404)
  }else{
  //1-declarar mi query
  const query = db.prepare("SELECT email, pass FROM users WHERE email = 'mari@mail.com' AND pass = '456781' "); 
  //2-ejecutar la query
  const foundUser = query.get(email, pass);

      if(foundUser !== undefined){
          res.json({userId: foundUser.id}); 
      }else{
          res.json({error: "Usuario no encontrado "});
      }
  }
})

// API
server.get("/movies", (req, res) => {
  //console.log("Peticion a la ruta GET /movies");
  //console.log(req.query);
  //1-Declarar mi query
  const query = db.prepare("SELECT * FROM movies");
  //2-Ejecutar mi query
  const responseBD = query.all();
  console.log(responseBD);

  //const response = {
    //success: true,
    //movies: [
      //{
        //id: '1',
        //title: 'Gambita de dama',
        //gender: 'Drama',
        //image: 'https://via.placeholder.com/150'
      //},
      //{
        //id: '2',
        //title: 'Friends',
        //gender: 'Comedia',
        //image: 'https://via.placeholder.com/150'
      //}
    //]
  //}
  // req.query.filter  ,  req.query.sort
  //const filterdata = response.movies.filter((movies) => movies.title === req.query.title);
  //res.json(filterdata);
  res.json(responseBD);
})

//server.post("/movies", (req, res) => {
  //res.json({ error: "No esta permitido" })
//})


