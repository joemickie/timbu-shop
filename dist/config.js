"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'supersecret',
    db: {
        contactPoints: [process.env.DB_CONTACT_POINTS || '127.0.0.1'],
        localDataCenter: process.env.DB_LOCAL_DATACENTER || 'datacenter1',
        keyspace: process.env.DB_KEYSPACE || 'mykeyspace'
    }
};
