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
exports.createItem = exports.getAllItems = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.execute('SELECT * FROM items');
    // Map the rows to the Item type
    const items = result.rows.map(row => ({
        id: row['id'],
        name: row['name'],
        description: row['description'],
        created_at: row['created_at'],
    }));
    return items;
});
exports.getAllItems = getAllItems;
const createItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO items (id, name, description, created_at) VALUES (?, ?, ?, ?)';
    yield db_1.default.execute(query, [item.id, item.name, item.description, item.created_at], { prepare: true });
});
exports.createItem = createItem;
