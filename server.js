const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/api/swagger/swagger.yaml");
const SwaggerExpress = require("swagger-express-mw");
const authCheck = require('./src/helper/auth');
require('dotenv').config()

let dirConfig = {
  appRoot: __dirname + "/src", // required config
  swaggerSecurityHandlers: {
    basicJwtAuth: async function (req, authOrSecDef, scopesOrApiKey, cb) {
      let auth = req.headers.jwttoken;
      if (auth) {
        let jwtCheckResponse = await authCheck.authenticateJwtToken(req.headers.jwttoken);
        console.log("jwtCheckResponse", jwtCheckResponse)
        if (jwtCheckResponse.msg.verified) {
          req.query.authData = {
            userData: {
              email: jwtCheckResponse.msg.email,
              name: jwtCheckResponse.msg.name,
              id: jwtCheckResponse.msg.id
            },
            typeOfAuth: 'internal'
          };
          cb(null);
        }else{
          req.res.status(401).send('unauthorised access');
        }
      } else {
        req.res.status(401).send('Unauthorised');
        cb(new Error("access denied!"));
      }
    },
  },
};
SwaggerExpress.create(dirConfig, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  const options = {
    security: [{ basicJwtAuth: [] }],
  };

  swaggerExpress.register(app);
  let port = process.env.PORT ? process.env.PORT : 5678;
  app.use('/', swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup(swaggerDocument, options));
  app.use(cors);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
