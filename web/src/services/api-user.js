// login

const sendLoginToApi = data => {
  console.log('Se están enviando datos al login:', data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      //   if (data.email.includes('gmail')) {
      //     return {
      //       success: true,
      //       userId: '123'
      //     };
      //   } else {
      //     return {
      //       success: false,
      //       errorMessage: 'Usuario no encontrado'
      //     };
      //   }
      return data;
    });
};

// signup
const sendSingUpToApi = data => {
  console.log('Se están enviando datos al signup:', data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('http://localhost:4000/signup',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data;

      //success: false,
      //errorMessage: 'Usuario ya existente'
      //};
    });
};
// //Lo he copiado del ejercicio de Yanelis
// app.post("/user/signUp", (req, res) => {
//   const email = req.body.email;
//   const pass = req.body.password;

//   if (email === "" || email === undefined || pass === "" || pass == undefined) {
//     res.json({
//       error: true,
//       message: "debe enviar todos los datos"
//     });

//     //usuario existe 
//     const querySelectUser = db.prepare("SELECT * FROM users WHERE email = ?");
//     const userFound = querySelectUser.get(email);

//     //condicional 
//     if (userFound === undefined) {
//       const query = db.prepare("INSERT  into users(email, pass) values (?,?);");
//       const userInsert = query.run(email, pass);
//       res.json({
//         error: false,
//         userId: userInsert.lastInsertRowid
//       });
//     } else {
//       res.json({
//         error: true,
//         message: "usuario ya existe"
//       });
//     }
//   }
// });

// // profile

const sendProfileToApi = (userId, data) => {
  console.log('Se están enviando datos al profile:', userId, data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json');
};

const getProfileFromApi = userId => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json')
    .then(response => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        name: 'Maricarmen',
        email: 'mari@mail.com',
        password: '1234567'
      };
    });
};

// user movies

const getUserMoviesFromApi = userId => {
  console.log('Se están pidiendo datos de las películas de la usuaria:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json')
    .then(response => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        movies: [
          {
            id: 1,
            title: 'Gambita de dama',
            gender: 'Drama',
            image:
              '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
          }
        ]
      };
    });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi
};

export default objToExport;
