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
const bot_1 = __importDefault(require("../bot"));
const process_1 = require("../lib/process");
const db_1 = __importDefault(require("../db"));
const session_1 = __importDefault(require("telegraf/session"));
const stage_1 = __importDefault(require("telegraf/stage"));
const exec_1 = __importDefault(require("./scenes/exec"));
const stage = new stage_1.default([exec_1.default]);
bot_1.default.use(session_1.default());
bot_1.default.use(stage.middleware());
bot_1.default.hears(/\/exec ?((.|\n)*)?/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    bot_1.default.telegram.sendChatAction(ctx.chat.id, "typing");
    const [, command] = ctx.match;
    if (command) {
        const then = new Date().getTime();
        process_1.Execute(command).then((output) => __awaiter(void 0, void 0, void 0, function* () {
            const time_taken = new Date().getTime() - then;
            yield ctx.reply(output || "Program executed");
            if (db_1.default.get("send_time_taken").value()) {
                ctx.reply(`Time taken: <code>${time_taken}ms</code>`, {
                    parse_mode: "html"
                });
            }
        }));
    }
    else {
        ctx.scene.enter("Exec");
    }
}));
//# sourceMappingURL=command.js.map