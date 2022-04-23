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
var TOKEN_BOT = process.env.TOKEN_BOT;
var ID_CHANNEL = process.env.ID_CHANNEL;
if (TOKEN_BOT === undefined) {
    throw new Error('TOKEN_BOT must be provided!');
}
var gradeHand = new telegraf_1.Composer();
gradeHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Number(ctx.message.text)) return [3 /*break*/, 2];
                ctx.scene.session.age = ctx.message.text;
                return [4 /*yield*/, ctx.reply('В каком ты классе?')];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 2: return [2 /*return*/, ctx.reply("\u0427\u0442\u043E-\u0442\u043E \u043D\u0435 \u0442\u043E. \u0414\u0430\u0432\u0430\u0439 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0435\u0449\u0435 \u0440\u0430\u0437\n\n\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0442\u0435\u0431\u0435 \u043B\u0435\u0442?")];
        }
    });
}); });
var lessonHand = new telegraf_1.Composer();
lessonHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Number(ctx.message.text)) {
                    return [2 /*return*/, ctx.reply("\u0427\u0442\u043E-\u0442\u043E \u043D\u0435 \u0442\u043E. \u0414\u0430\u0432\u0430\u0439 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0435\u0449\u0435 \u0440\u0430\u0437\n\n\u0412 \u043A\u0430\u043A\u043E\u043C \u0442\u044B \u043A\u043B\u0430\u0441\u0441\u0435?")];
                }
                ctx.scene.session.grade = ctx.message.text;
                return [4 /*yield*/, ctx.replyWithMarkdown("\n    \u041D\u0430 \u043A\u0430\u043A\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u0439\u0434\u0435\u0448\u044C?\n*\u0422\u0435\u043A\u0441\u0442*, \u043F\u043E\u044F\u0441\u043D\u044F\u044E\u0449\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u0438\u0439,\n*\u0422\u0435\u043A\u0441\u0442*, \u043F\u043E\u044F\u0441\u043D\u044F\u044E\u0449\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u0438\u0439,\n*\u0422\u0435\u043A\u0441\u0442*, \u043F\u043E\u044F\u0441\u043D\u044F\u044E\u0449\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u0438\u0439,\n*\u0422\u0435\u043A\u0441\u0442*, \u043F\u043E\u044F\u0441\u043D\u044F\u044E\u0449\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u0438\u0439,\n*\u0422\u0435\u043A\u0441\u0442*, \u043F\u043E\u044F\u0441\u043D\u044F\u044E\u0449\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u0438\u0439,\n*\u0422\u0435\u043A\u0441\u0442*, \u043F\u043E\u044F\u0441\u043D\u044F\u044E\u0449\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u0438\u0439,", telegraf_1.Markup.inlineKeyboard([
                        [telegraf_1.Markup.button.callback('Занимательная математика', 'day_math')],
                        [telegraf_1.Markup.button.callback('Ментальная арифметика', 'day_arith')],
                        [telegraf_1.Markup.button.callback('Хочу повторить школьную программу', 'day_repeat')],
                        [telegraf_1.Markup.button.callback('Подготовка к экзаменам', 'day_trainexam')],
                    ]))];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
var dayHand = new telegraf_1.Composer();
dayHand.action(/day_repeat/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.lesson = ctx.match[0];
                return [4 /*yield*/, ctx.editMessageText("Укажи последнюю тему, которую ты помнишь", {
                        parse_mode: "Markdown"
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
dayHand.action(/day_trainexam/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.lesson = ctx.match[0];
                return [4 /*yield*/, ctx.editMessageText("К какому экзамену нужна подготовка?", {
                        parse_mode: "Markdown"
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
dayHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ctx.scene.session.lesson === 'day_repeat')) return [3 /*break*/, 2];
                ctx.scene.session.lastTopic = ctx.message.text;
                return [4 /*yield*/, (0, additionfunc_1.addKeyboardDay)(ctx, true)];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.selectStep(ctx.wizard.cursor + 2)];
            case 2:
                if (!(ctx.scene.session.lesson === 'day_trainexam')) return [3 /*break*/, 4];
                ctx.scene.session.nameExam = ctx.message.text;
                return [4 /*yield*/, ctx.reply("Пришли сайт школы или ссылку на пример экзамена")];
            case 3:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 4:
                if (!ctx.scene.session.lesson) {
                    ctx.deleteMessage();
                    ctx.reply('Выбери сверху занятие');
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); });
dayHand.action(/day_[am].*/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.lesson = ctx.match[0];
                return [4 /*yield*/, (0, additionfunc_1.addKeyboardDay)(ctx, undefined)];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.selectStep(ctx.wizard.cursor + 3)];
        }
    });
}); });
var urlHand = new telegraf_1.Composer();
urlHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.message.text) return [3 /*break*/, 2];
                if (!(ctx.scene.session.lesson === "day_trainexam" || ctx.scene.session.lesson === "day_trainexam")) return [3 /*break*/, 2];
                if (ctx.scene.session.lesson === "day_trainexam") {
                    ctx.scene.session.url = ctx.message.text;
                }
                return [4 /*yield*/, (0, additionfunc_1.addKeyboardDay)(ctx, true)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
var timeHand = new telegraf_1.Composer();
timeHand.action(/time_.*/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.match[0] === "time_stop") {
            if (ctx.scene.session.time != undefined) {
                if (ctx.scene.session.time.length != 0) {
                    ctx.scene.session[ctx.scene.session.currentDay] = ctx.scene.session.time;
                }
                else {
                    ctx.scene.session[ctx.scene.session.currentDay] = undefined;
                }
            }
            else {
                ctx.scene.session[ctx.scene.session.currentDay] = undefined;
            }
            ctx.scene.session.time = [];
            return [2 /*return*/, (0, additionfunc_1.addKeyboardDay)(ctx, undefined)];
        }
        ctx.scene.session.currentDay = ctx.match[0];
        (0, additionfunc_1.addKeyboardTime)(ctx, ctx.match[0]);
        return [2 /*return*/, ctx.wizard.next()];
    });
}); });
timeHand.action(/1[0-8]/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, additionfunc_1.addKeyboardTime)(ctx, ctx.match[0])];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
timeHand.action(/day_stop/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var respone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.editMessageText("\u041C\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u0442\u0432\u043E\u0438 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F:\n\n*\u0417\u0430\u043D\u044F\u0442\u0438\u0435:* ".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "\n").concat((0, additionfunc_1.renderListDay)(ctx.scene.session), "\n\n\u041D\u0430\u0436\u043C\u0438\u0442\u0435 /start \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0435\u0449\u0435 \u043E\u0434\u043D\u0443 \u0437\u0430\u044F\u0432\u043A\u0443"), { parse_mode: "Markdown" })];
            case 1:
                _a.sent();
                respone = "*\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C:* @".concat(ctx.scene.session.userName, ".\n*\u0412\u043E\u0437\u0440\u0430\u0441\u0442:* ").concat(ctx.scene.session.age, "\n*\u041A\u043B\u0430\u0441\u0441:* ").concat(ctx.scene.session.grade, "\n\n*\u0417\u0430\u043D\u044F\u0442\u0438\u0435:* ").concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "\n");
                if (ctx.scene.session.lesson === "day_repeat") {
                    respone += "\n*\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0442\u0435\u043C\u0430:* ".concat(ctx.scene.session.lastTopic, "\n");
                }
                if (ctx.scene.session.nameExam) {
                    respone += "\n*\u041A\u0430\u043A\u043E\u0439 \u044D\u043A\u0437\u0430\u043C\u0435\u043D:* ".concat(ctx.scene.session.nameExam, "\n*\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0448\u043A\u043E\u043B\u0443/\u044D\u043A\u0437\u0430\u043C\u0435\u043D:* ").concat(ctx.scene.session.url);
                }
                respone += (0, additionfunc_1.renderListDay)(ctx.scene.session);
                //ctx.replyWithMarkdown(respone);
                return [4 /*yield*/, bot.telegram.sendMessage(ID_CHANNEL, respone, { parse_mode: "Markdown" })];
            case 2:
                //ctx.replyWithMarkdown(respone);
                _a.sent();
                (0, sheet_1.apendDataGS)((0, additionfunc_1.fromCtxToArray)(ctx.scene.session));
                return [2 /*return*/, ctx.scene.leave()];
        }
    });
}); });
var endHand = new telegraf_1.Composer();
endHand.action(/(time_stop)|(day_stop)|(1[0-8])/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ctx.match[0] === 'day_stop')) return [3 /*break*/, 1];
                return [2 /*return*/, ctx.wizard.next()];
            case 1:
                if (!(ctx.match[0] === 'time_stop')) return [3 /*break*/, 3];
                if (ctx.scene.session.time != undefined) {
                    if (ctx.scene.session.time.length != 0) {
                        ctx.scene.session[ctx.scene.session.currentDay] = ctx.scene.session.time;
                    }
                    else {
                        ctx.scene.session[ctx.scene.session.currentDay] = undefined;
                    }
                }
                else {
                    ctx.scene.session[ctx.scene.session.currentDay] = undefined;
                }
                ctx.scene.session.time = [];
                return [4 /*yield*/, (0, additionfunc_1.addKeyboardDay)(ctx, undefined)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, additionfunc_1.addKeyboardTime)(ctx, ctx.match[0])];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, ctx.wizard.back()];
        }
    });
}); });
var superWizard = new telegraf_1.Scenes.WizardScene('super-wizard', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.userId = ctx.from.id;
                ctx.scene.session.userName = ctx.from.username;
                (0, additionfunc_1.init)(ctx.scene.session);
                return [4 /*yield*/, ctx.replyWithMarkdown("\u041F\u0440\u0438\u0432\u0435\u0442!\n\n\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0442\u0435\u0431\u0435 \u043B\u0435\u0442?")];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); }, gradeHand, lessonHand, dayHand, dayHand, urlHand, timeHand, endHand);
var bot = new telegraf_1.Telegraf(TOKEN_BOT);
var stage = new telegraf_1.Scenes.Stage([superWizard]);
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.start(function (ctx) { return ctx.scene.enter('super-wizard'); });
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
