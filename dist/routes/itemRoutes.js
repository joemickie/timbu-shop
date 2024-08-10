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
exports.itemRoutes = void 0;
const itemController_1 = require("../controllers/itemController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const itemRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.get('/items', { preHandler: [authMiddleware_1.authMiddleware] }, itemController_1.getItems);
    fastify.post('/items', {
        preHandler: [authMiddleware_1.authMiddleware],
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                },
                required: ['id', 'name', 'description', 'created_at'],
            },
        },
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            // Ensure the request body matches the expected type
            yield (0, itemController_1.addItem)(request, reply);
        }),
    });
});
exports.itemRoutes = itemRoutes;
