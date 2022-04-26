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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-floating-promises */
require("dotenv/config");
var telegraf_1 = require("telegraf");
var additionfunc_1 = require("./additionfunc");
var sheet_1 = require("./sheet");
var additionConst_1 = require("./additionConst");
var handler_1 = require("./handler");
var TOKEN_BOT = process.env.TOKEN_BOT;
var ID_CHANNEL = process.env.ID_CHANNEL;
var ID_CHAT_NOTI = process.env.ID_CHAT;
if (!TOKEN_BOT) {
    throw new Error('TOKEN_BOT must be provided!');
}
handler_1.timeHand.action(/day_stop/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var respone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.editMessageText("\u041C\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u0432\u0430\u0448\u0438 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F:\n\n*\u0417\u0430\u043D\u044F\u0442\u0438\u0435:* ".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "\n").concat((0, additionfunc_1.renderListDay)(ctx.scene.session), "\n\n\u041D\u0430\u0436\u043C\u0438\u0442\u0435 /start \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0435\u0449\u0435 \u043E\u0434\u043D\u0443 \u0437\u0430\u044F\u0432\u043A\u0443"), { parse_mode: "Markdown" })];
            case 1:
                _a.sent();
                respone = "*\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C:* @".concat(ctx.scene.session.userName, ".\n*\u0412\u043E\u0437\u0440\u0430\u0441\u0442:* ").concat(ctx.scene.session.age, "\n*\u041A\u043B\u0430\u0441\u0441:* ").concat(ctx.scene.session.grade, "\n\n*\u0417\u0430\u043D\u044F\u0442\u0438\u0435:* ").concat(additionConst_1.list_lessons[ctx.scene.session.lesson]);
                if (ctx.scene.session.lesson === "day_repeat") {
                    respone += "\n*\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0442\u0435\u043C\u0430:* ".concat(ctx.scene.session.lastTopic, "\n");
                }
                if (ctx.scene.session.url) {
                    respone += "\n*\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0448\u043A\u043E\u043B\u0443/\u044D\u043A\u0437\u0430\u043C\u0435\u043D:* ".concat(ctx.scene.session.url, "\n");
                }
                if (ctx.scene.session.myself) {
                    respone += "\n*\u0421\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442:* ".concat(ctx.scene.session.myself, "\n");
                }
                respone += (0, additionfunc_1.renderListDay)(ctx.scene.session);
                return [4 /*yield*/, bot.telegram.sendMessage(ID_CHANNEL, respone, { parse_mode: "Markdown" })];
            case 2:
                _a.sent();
                (0, sheet_1.apendDataGS)((0, additionfunc_1.fromCtxToArray)(ctx.scene.session));
                return [2 /*return*/, ctx.scene.leave()];
        }
    });
}); });
var bot = new telegraf_1.Telegraf(TOKEN_BOT);
try {
    var superWizard = new telegraf_1.Scenes.WizardScene('super-wizard', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx.scene.session.userId = ctx.from.id;
                    ctx.scene.session.userName = ctx.from.username;
                    (0, additionfunc_1.init)(ctx.scene.session);
                    return [4 /*yield*/, ctx.replyWithMarkdown("\u041F\u0440\u0438\u0432\u0435\u0442!\n    \n\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0412\u0430\u043C \u043B\u0435\u0442? (\u0420\u0435\u0431\u0451\u043D\u043A\u0443)")];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ctx.wizard.next()];
            }
        });
    }); }, handler_1.gradeHand, handler_1.lessonHand, handler_1.dayHand, handler_1.urlHand, handler_1.timeHand, handler_1.endHand);
    var stage = new telegraf_1.Scenes.Stage([superWizard]);
    bot.use((0, telegraf_1.session)());
    bot.use(stage.middleware());
    bot.start(function (ctx) { return ctx.scene.enter('super-wizard'); });
    bot.launch();
}
catch (e) {
    var error = "Throw error in bot. Error message: " + e.message;
    bot.telegram.sendMessage(ID_CHAT_NOTI, error);
}
finally {
    // Enable graceful stop
    process.once('SIGINT', function () { return bot.stop('SIGINT'); });
    process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
}
