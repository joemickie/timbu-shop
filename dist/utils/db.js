"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const cassandra_driver_1 = require("cassandra-driver");
const config_1 = require("../config");
const client = new cassandra_driver_1.Client({
    contactPoints: config_1.config.db.contactPoints,
    localDataCenter: config_1.config.db.localDataCenter,
    keyspace: config_1.config.db.keyspace
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected to ScyllaDB');
    }
    catch (error) {
        console.error('Failed to connect to ScyllaDB', error);
    }
});
exports.connectDB = connectDB;
exports.default = client;
