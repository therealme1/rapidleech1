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
const wizard_1 = __importDefault(require("telegraf/scenes/wizard"));
const shelljs_1 = __importDefault(require("shelljs"));
const bot_1 = __importDefault(require("../../bot"));
const ExecWizard = new wizard_1.default("Exec", ctx => {
    ctx.reply("⛏ Send commands...");
    ctx.wizard.next();
}, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const command = ctx.message.text;
    if (command === "exit") {
        ctx.scene.leave();
        ctx.reply(`Session closed.`);
        return;
    }
    bot_1.default.telegram.sendChatAction(ctx.chat.id, "typing");
    if (ctx.session.w_dir) {
        shelljs_1.default.cd(ctx.session.w_dir);
    }
    const w_dir = command.match(/^cd (.*)$/);
    w_dir ? shelljs_1.default.cd(w_dir[1]) : null;
    const output = shelljs_1.default.exec(command, {
        silent: true
    });
    if (output.stdout && output.stdout.length > 4090) {
        ctx.replyWithDocument({
            source: Buffer.from(output.stdout),
            filename: `output_${new Date().getTime()}`
        });
    }
    else
        ctx.reply(output.stdout || "Executed");
}));
exports.default = ExecWizard;
//# sourceMappingURL=exec.js.map