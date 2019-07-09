import "dotenv/config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { CreateUsers, AllUsers, UpdateUsersById, DeleteUsersById, ValidateUsers } from '../src/users/index';

//mongodb://surendraraj3:a123456789@ds161764.mlab.com:61764/
//mongodb://surendraraj3:a123456789@ds111993.mlab.com:11993/yoofoo-web
mongoose
  .connect("mongodb://surendraraj3:a123456789@ds161764.mlab.com:61764/inteluscan", { useNewUrlParser: true } )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: process.env.IP || '0.0.0.0',
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});

server.route({
  method: 'POST',
  path:'/create-user',
  handler:CreateUsers
})

server.route({
  method: 'GET',
  path: '/all-users',
  handler:AllUsers
})

server.route({
  method: 'PUT',
  path:'/update-users/{id}',
  handler: UpdateUsersById
})

//Delete users by id
server.route({
  method: 'DELETE',
  path:'/delete-users/{id}',
  handler: DeleteUsersById
})

server.route({
  method:'POST',
  path:'/validate-user',
  handler: ValidateUsers
})

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
// console.log("Welcome to node js web project.");

// console.log(process.env.MY_SECRET);
