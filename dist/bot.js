"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importDefault(require("telegraf"));
const bot = new telegraf_1.default(process.env.BOT_TOKEN, {
    username: process.env.BOT_USERNAME
});
exports.default = bot;
//# sourceMappingURL=bot.js.map