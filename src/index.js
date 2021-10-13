const express = require('express');
const cors = require('cors');

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