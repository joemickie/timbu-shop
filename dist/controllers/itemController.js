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
exports.addItem = exports.getItems = void 0;
const itemService_1 = require("../services/itemService");
const getItems = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, itemService_1.getAllItems)();
        reply.send(items);
    }
    catch (error) {
        reply.status(500).send({ error: 'Failed to fetch items' });
    }
});
exports.getItems = getItems;
const addItem = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = request.body; // Explicitly cast body to Item
        yield (0, itemService_1.createItem)(item);
        reply.status(201).send({ message: 'Item created' });
    }
    catch (error) {
        reply.status(500).send({ error: 'Failed to create item' });
    }
});
exports.addItem = addItem;
