import protoLoader from "@grpc/proto-loader";
import mesageService from "./message.js";
import grpc from "grpc";
import path from 'path';

const PORT = process.env.PORT ?? 5001;
const HOST = "0.0.0.0";

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

    server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
}
main();