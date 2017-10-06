const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const connectionString = "postgres://htzlvpijantviz:0704439e8af1fd342fbfab70e3612a9bff26a9e7c3c11deab67f7268947cab43@ec2-54-235-120-39.compute-1.amazonaws.com:5432/deen421jqsb5di?ssl=true";
    

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({connectionString}).then( db => {
  app.set('db', db);


//Get connectionString from Heroku

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============
app.get('/api/users', mainCtrl.getUsers);
app.get('/api/vehicles', mainCtrl.getVehicles);

app.post('/api/users', mainCtrl.addUser);
app.post('/api/vehicles', mainCtrl.addVehicle);

app.get('/api/user/:userId/vehiclecount', mainCtrl.getVehicleCount);
app.get('/api/user/:userId/vehicle', mainCtrl.getVehicleById);
app.get('/api/vehicle', mainCtrl.findAllVehicles);
app.get('/api/newervehiclesbyyear', mainCtrl.getVehiclesByYear);

app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.changeOwner);

app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwner);
app.delete('/api/vehicle/:vehicleId', mainCtrl.removeVehicle);




// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})

// host: //host,
// port: //port,
// database: //database,
// user: //user,
// password: //password
