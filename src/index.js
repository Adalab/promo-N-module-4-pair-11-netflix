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

// API
/*server.get("/movies", (req, res) => {
  console.log("Peticion a la ruta /");
  res.send("<html><body><ul>Lista de Peliculas</ul></body></html>")
})*/
server.get("/movies", (req, res) => {
  console.log("Peticion a la ruta GET /movies");
  console.log(req.query);

  const response = {
    success: true,
      movies: [
        {
          id: '1',
          title: 'Gambita de dama',
          gender: 'Drama',
          image: 'https://via.placeholder.com/150'
        },
        {
          id: '2',
          title: 'Friends',
          gender: 'Comedia',
          image: 'https://via.placeholder.com/150'
        }
      ]
  }
  // req.query.filter  ,  req.query.sort
  //const filterdata = response.movies.filter((movies) => movies.title === req.query.title);
  //res.json(filterdata);
  res.json(response);
})

//server.post("/movies", (req, res) => {
  //res.json({ error: "No esta permitido" })
//})


