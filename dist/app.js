"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_route_1 = __importDefault(require("./routes/todos.route"));
const app = (0, express_1.default)();
app.use("/todos", todos_route_1.default);
app.use(express_1.default.json());
// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000, () => console.log("Server running on port 3000"));
