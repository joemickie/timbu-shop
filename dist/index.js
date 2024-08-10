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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const itemRoutes_1 = require("./routes/itemRoutes");
const db_1 = require("./utils/db");
const config_1 = require("./config");
const server = (0, fastify_1.default)();
server.register(jwt_1.default, { secret: config_1.config.jwtSecret });
server.register(itemRoutes_1.itemRoutes);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        yield server.listen(config_1.config.port);
        console.log(`Server is listening on port ${config_1.config.port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
