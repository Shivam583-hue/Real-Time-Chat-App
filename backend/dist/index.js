"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const connectFile_1 = __importDefault(require("./db/connectFile"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use("/api/messages", message_route_1.default);
app.use("/api/users", user_route_1.default);
// app.get('/',(req,res)=> {
//     res.send("Server is running")
// })
app.listen(PORT, () => {
    (0, connectFile_1.default)();
    console.log(`Server Running on port ${PORT} `);
});
