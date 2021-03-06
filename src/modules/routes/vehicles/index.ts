// IMPORT PLUGIN
import * as fp from "fastify-plugin";

// ROUTES GET
export default fp(async (server, opts, next) => {
  server.get("/vehicles/:id", {}, async (request, reply) => {
    try {
      const _id = request.params.id;

      const vehicle = await server.db.models.Vehicle.findOne({
        _id
      });

      if (!vehicle) {
        return reply.send(404);
      }

      return reply.code(200).send(vehicle);
    } catch (error) {
      request.log.error(error);
      return reply.send(400);
    }
  });

  // ROUTES GET All VEHICLES
  server.get("/vehicles", {}, async (request, reply) => {
    try {
      const vehicle = await server.db.models.Vehicle.find();
      return vehicle
    } catch (error) {
      request.log.error(error);
      return reply.send(400);
    }
  });

// ROUTES POST
  server.post("/vehicles", {}, async (request, reply) => {
    try {
      const { Vehicle } = server.db.models;

      const vehicle = await Vehicle.create(request.body);

      return reply.code(201).send(vehicle);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });
  next();
});