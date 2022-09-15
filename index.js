import protoLoader from "@grpc/proto-loader";
import mesageService from "./message.js";
import grpc from "grpc";
import path from 'path';

const protoPath = path.resolve(process.cwd(), 'interface.proto');

const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const messageProto = grpc.loadPackageDefinition(packageDefinition).message_service;


function main () {
    const server = new grpc.Server();
    server.addService(messageProto.messageService.service, mesageService);

    server.bind(
      `https://microservices-message-service.herokuapp.com/`,
      grpc.ServerCredentials.createInsecure()
    );
    server.start();
}
main();