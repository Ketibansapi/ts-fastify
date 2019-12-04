// IMPORT PACKAGES and PLUGIN
import { Server, IncomingMessage, ServerResponse } from "http"; // Enable server
import * as sourceMapSupport from "source-map-support"; // DIR location error
import * as fastify from "fastify"; // Initialize Fastify
import * as fastifyBlipp from "fastify-blipp"; // Initialize fb
// import * as config from "config";

// ROUTES
import statusRoutes from "./modules/routes/status"; 
import vehiclesRoutes from "./modules/routes/vehicles";
import errorThrowerRoutes from "./modules/routes/error-thrower";

// IMPORT DB
import db from "./modules/db";

// INITIALIZE 
const uuidv4 = require('uuid/v4');
// const path = require('path');
// const AutoLoad = require('fastify-autoload');

// SOURCE MAP INITIALIZE
sourceMapSupport.install();

// Create Request id
const createRequestId = () => uuidv4();

// Create Server
const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({
      ignoreTrailingSlash: true,
      logger: true 
      //     genReqId: createRequestId,
      //     level: logSeverity
});

// Register Server
server.register(fastifyBlipp);
server.register(db, { uri: "mongodb://localhost:27017/vehicles" });
// server.register(db, config.get('db'));
server.register(vehiclesRoutes);
server.register(statusRoutes);
server.register(errorThrowerRoutes);

// Start Server
const start = async () => {
  try {
    await server.listen(3000, "0.0.0.0");
    server.blipp();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};
process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});

start();