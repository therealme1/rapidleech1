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
require("dotenv").config();
const { ADMIN_ID } = process.env;
const bot_1 = __importDefault(require("./bot"));
// Midlleware
bot_1.default.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ADMIN_ID.split(",").indexOf(ctx.from.id.toString()) < 0) {
        ctx.reply(`❌ You are not authorized to use this bot.`);
    }
    else {
        next();
    }
}));
// Load Handlers
require("./handlers/command");
require("./handlers/setting");
// Launch the bot
bot_1.default.launch();
//# sourceMappingURL=index.js.map