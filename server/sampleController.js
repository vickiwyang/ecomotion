const { javascript } = require('webpack');
const db = require('./databaseModels.js');
//require in query
const { query } = require('./databaseModels.js');

const cookieParser = require('cookie-parser');

const sampleController = {};

sampleController.getAirport = (req, res, next) => {
  console.log('inside the getAirport controller')
  const allAirports = 'SELECT code, name, countryname from airports';

  const airports = [];

  db.query(allAirports)
    .then((results) => {
      results.rows.forEach((row) => {
        return airports.push(row.code + ', ' + row.name + ', ' + row.countryname)
      });
      res.locals.airports = airports;
      next();
    });
};

sampleController.sendFlightInfo = (req, res, next) => {
  console.log('getting cookies', req.cookies['session-name.sig']);
  console.log('gettin info from body for flight', req.body);
  const ssid = [req.cookies['session-name.sig']];
  const queryUserId = 'SELECT _id FROM users WHERE ssid=$1';
  db.query(queryUserId, ssid).then((res) => {
    const queryInsertFlight =
      'INSERT INTO flights (depart, arrive, user_id, co2_impact) VALUES ($1, $2, $3, $4)';
    const flightInsert = [
      req.body.dep,
      req.body.arr,
      res.rows[0]['_id'],
      req.body.carbon,
    ];
    db.query(queryInsertFlight, flightInsert)
      .then((res) => console.log('successfully queried in sendFlightInfo'))
      .then(() => next())
      .catch((err) =>
        console.log('unable to complete query in sendFlightInfo', err)
      );
  });
};

sampleController.addProfile = (req, res, next) => {
  const querySelector =
    'INSERT INTO users (google_id, name, email, ssid) VALUES($1,$2,$3,$4);';
  const userInfo = [
    res.locals.id,
    res.locals.name,
    res.locals.email,
    res.locals.ssid,
  ];
  db.query(querySelector, userInfo)
    .then(() => console.log('successfully queried in addProfile'))
    .catch((err) => console.log('unable to complete query in addProfile', err));
  // return next();
};
module.exports = sampleController;
