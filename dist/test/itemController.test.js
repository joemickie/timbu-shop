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
const chai_1 = require("chai");
const fastify_1 = __importDefault(require("fastify"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const itemRoutes_1 = require("../routes/itemRoutes");
const config_1 = require("../config");
describe('Item API', () => {
    let server;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        server = (0, fastify_1.default)();
        server.register(fastify_jwt_1.default, { secret: config_1.config.jwtSecret });
        server.register(itemRoutes_1.itemRoutes);
        yield server.ready();
    }));
    it('should return 200 and list of items', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server.inject({
            method: 'GET',
            url: '/items',
            headers: {
                authorization: `Bearer ${server.jwt.sign({ user: 'test' })}`
            }
        });
        (0, chai_1.expect)(response.statusCode).to.equal(200);
        (0, chai_1.expect)(response.json()).to.be.an('array');
    }));
    it('should return 201 and create an item', () => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = {
            id: '1',
            name: 'Item 1',
            description: 'This is item 1',
            created_at: new Date() // Use Date object directly
        };
        const response = yield server.inject({
            method: 'POST',
            url: '/items',
            headers: {
                authorization: `Bearer ${server.jwt.sign({ user: 'test' })}`
            },
            payload: newItem
        });
        (0, chai_1.expect)(response.statusCode).to.equal(201);
        (0, chai_1.expect)(response.json().message).to.equal('Item created');
    }));
});
