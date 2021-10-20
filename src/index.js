const express = require('express');
const cors = require('cors');
const Database = require("better-sqlite3");

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

//CONFIGURAR BASE DE DATOS
const db = new Database('./src/db/database.db', {
  verbose: console.log
})

//TOMA PELICULAS DE BASE DE DATOS
server.get('/movies', (req, res) => {
  //SELECCIONAR QUERY
  const query = db.prepare(`SELECT * FROM movies`);
  //EJECUTAR QUERY
  const responseBD = query.all();
  res.json({ movies: responseBD }
  );
});

//CONFIGURAR MOTOR DE PLANTILLAS
server.set("view engine", "ejs");

//SELECCIONA ID - MOTOR DE PLANTILLAS
server.get('/movies/:moviesId', (req, res) => {
  console.log('mostrar películas por Id', req.params.moviesId);
  const query = db.prepare(`SELECT * FROM movies WHERE id = ?`);
  const result = query.get(req.params.moviesId);
  res.render('posts', result);
})

//SERVIDORES ESTÁTICOS DE IMAGENES (YA NO NECESITAMOS)
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

// GET /login ? email & passwd
server.post("/login", (req, res) => {
  // 1. Recogemos y comprobamos los param.
  // select --> columnas, from--->  de que tabla las saco, where --> condicion
  // order by --> metodo ordenamiento, limit--> limite de filaso registros
  //seleccionamos los datos de la BD
  const query = db.prepare(`SELECT * FROM users WHERE email= ? AND pass = ?`);
  const foundUser = query.get(req.body.email, req.body.password);
  console.log(foundUser);

  if (foundUser === undefined) {
    //si la usuario no existe devuelvo un error
    res.json({ error: "No encontrado" });
  }
  else {
    //si la usuario existe  devuelvo 
    res.json({ id: foundUser.id });
  }
});

//Api endpoint register
//Lo probé en BD y funciona pero en Postman no
server.post("/user/signUp", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  if (email === "" || email === undefined || pass === "" || pass == undefined) {
    res.json({
      error: true,
      message: "debe enviar todos los datos"
    });
  } else {

    //usuario existe 
    //funciona perfectamente en BD
    const querySelectUser = db.prepare("SELECT * FROM users WHERE email = ?");
    const userFound = querySelectUser.get(email);

    //condicional 
    //funciona perfectamente en BD
    if (userFound === undefined) {
      const query = db.prepare("INSERT INTO users(email, pass, nombre) values (?,?,?);");
      const userInsert = query.run(email, pass, nombre);
      res.json({
        error: false,
        id: userInsert.lastInsertRowid
      });
    } else {
      res.json({
        error: true,
        message: "usuario ya existente"
      });
    }
  }
});

//endpoint update
//Lo probé en BD y funciona pero en Postman no
server.patch("/user/update", (req, res)=>{
  const query= db.prepare("UPDATE users SET email=?, nombre=?, pass=? where id=?");
  const userUpdate = query.run(req.body.email, req.body.nombre, req.body.pass, req.body.id);
  if(userUpdate.changes !==0){
    res.json(
      {
        error: false,
        msj: "Se ha modificado con éxito"
      }
    )
  }else{
    res.json({error: true, msj: "Ha ocurrido un error"})
  }
}); 

//endpoint delete user
server.delete("/user/delete", (req, res)=>{
  //verificar que el usuario existe
  const queryUserExist= db.prepare("SELECT * FROM users where id=?"); 
  const userFound =  queryUserExist.get(req.body.id); 

  if(userFound === undefined ){
    res.json({
      error: true, message: "usuario no existe"
    })
  }else{
    const queryDeleteUser = db.prepare("DELETE from users where id = ?");
    const resultDelete = queryDeleteUser.run(req.body.id); 
    if(resultDelete.changes !==0){
      res.json({error: false, message: "usuario eliminado"}); 
    }else{
      res.json({error: true, message: "no fue posible eliminar el usuario "}); 
    }
  }
})


