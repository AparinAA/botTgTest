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
exports.endHand = exports.timeHand = exports.urlHand = exports.dayHand = exports.lessonHand = exports.gradeHand = void 0;
var telegraf_1 = require("telegraf");
var additionConst_1 = require("./additionConst");
var additionfunc_1 = require("./additionfunc");
//export handlers
exports.gradeHand = new telegraf_1.Composer();
exports.lessonHand = new telegraf_1.Composer();
exports.dayHand = new telegraf_1.Composer();
exports.urlHand = new telegraf_1.Composer();
exports.timeHand = new telegraf_1.Composer();
exports.endHand = new telegraf_1.Composer();
//handler for ask 'How old r u'?
exports.gradeHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Number(ctx.message.text)) return [3 /*break*/, 2];
                //Checking if the text is integer
                //entry age
                ctx.scene.session.age = ctx.message.text;
                return [4 /*yield*/, ctx.reply('В каком Вы классе?')];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 2: 
            //throw error and repeat 
            return [2 /*return*/, ctx.reply("\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A \uD83E\uDD37\u200D\u2642\uFE0F. \u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0435\u0449\u0435 \u0440\u0430\u0437\n\n\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0412\u0430\u043C \u043B\u0435\u0442? (\u0420\u0435\u0431\u0451\u043D\u043A\u0443)")];
        }
    });
}); });
//handler for ask 'what grade r u?'
exports.lessonHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Number(ctx.message.text)) {
                    //Checking if the text is integer and throw error and repeat enter
                    return [2 /*return*/, ctx.reply("\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A \uD83E\uDD37\u200D\u2642\uFE0F. \u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0435\u0449\u0435 \u0440\u0430\u0437\n\n\u0412 \u043A\u0430\u043A\u043E\u043C \u0412\u044B \u043A\u043B\u0430\u0441\u0441\u0435?")];
                }
                //entry grade
                ctx.scene.session.grade = ctx.message.text;
                //reply message description of lessons with keyboard select
                return [4 /*yield*/, ctx.replyWithMarkdown("\n    \u041D\u0430 \u043A\u0430\u043A\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u0439\u0434\u0435\u0442\u0435?\n    \n*\u0417\u0430\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430*\n\n\u0412\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0433\u0440\u0443\u0437\u0438\u0442\u044C\u0441\u044F \u0432 \u043C\u0438\u0440 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E\u0439 \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0438, \u043D\u0430\u0443\u0447\u0438\u0442\u044C\u0441\u044F \u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438 \u0440\u0430\u0441\u0441\u0443\u0436\u0434\u0430\u0442\u044C \u0438 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F.\n\n*\u0428\u043A\u043E\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430*\n\n\u0412\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0448\u043A\u043E\u043B\u044C\u043D\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443 \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0441 \u0442\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u0438\u0441\u044C. \n\n*\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430\u043C*\n\n\u0412\u044B \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442\u0435 \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u0442\u044C \u0432 \u0448\u043A\u043E\u043B\u0443 \u0437\u0430\u0440\u0443\u0431\u0435\u0436\u043E\u043C \u0438 \u043E\u0431\u0443\u0447\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435 (\u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A \u0432\u0441\u0442\u0443\u043F\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430\u043C).\n", telegraf_1.Markup.inlineKeyboard([
                        [telegraf_1.Markup.button.callback('Занимательная математика', 'day_math')],
                        [telegraf_1.Markup.button.callback('Школьная программа', 'day_repeat')],
                        [telegraf_1.Markup.button.callback('Подготовка к экзаменам', 'day_trainexam')],
                        [telegraf_1.Markup.button.callback('Свой вариант', 'day_myself')],
                    ]))];
            case 1:
                //reply message description of lessons with keyboard select
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
//Handler choice lessons 
exports.dayHand.action(/day_repeat/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.lesson = ctx.match[0];
                return [4 /*yield*/, ctx.editMessageText("\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0442\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0438\u044F - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*\n    \n\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u0442\u0435\u043C\u0443, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0432\u044B \u043F\u043E\u043C\u043D\u0438\u0442\u0435"), {
                        parse_mode: "Markdown"
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
exports.dayHand.action(/day_trainexam/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.lesson = ctx.match[0];
                return [4 /*yield*/, ctx.editMessageText("\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0442\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0438\u044F - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*\n\n\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0430\u0439\u0442 \u0448\u043A\u043E\u043B\u044B, \u0432 \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442\u0435 \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u0442\u044C, \u0438\u043B\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u043F\u0440\u0438\u043C\u0435\u0440 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430"), {
                        parse_mode: "Markdown"
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
exports.dayHand.action(/day_myself/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.scene.session.lesson = ctx.match[0];
                return [4 /*yield*/, ctx.editMessageText("\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0442\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0438\u044F - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*\n\n\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u0437\u0430\u043D\u044F\u0442\u0438\u044F/\u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438"), {
                        parse_mode: "Markdown"
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
exports.dayHand.action(/day_math/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.scene.session.lesson = ctx.match[0];
        (0, additionfunc_1.addKeyboardDay)(ctx, undefined);
        //If choice option day_math then jump to next next handler
        return [2 /*return*/, ctx.wizard.selectStep(ctx.wizard.cursor + 2)];
    });
}); });
//handler for text day_repeate, myself, trainexam
exports.urlHand.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.scene.session.lesson === 'day_repeat') {
            //Last topic what r u remember
            ctx.scene.session.lastTopic = ctx.message.text;
        }
        else if (ctx.scene.session.lesson === 'day_myself') {
            //Own topic for lesson
            ctx.scene.session.myself = ctx.message.text;
        }
        else if (ctx.scene.session.lesson === 'day_trainexam') {
            //Url school or exam example
            ctx.scene.session.url = ctx.message.text;
        }
        //wish list of days
        (0, additionfunc_1.addKeyboardDay)(ctx, true);
        return [2 /*return*/, ctx.wizard.next()];
    });
}); });
exports.timeHand.action(/time_.*/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.match[0] === "time_stop") {
            //append list of time to slot day if select timeslot is over
            //Update timeslot of days
            (0, additionfunc_1.updateTimeSlot)(ctx.scene.session);
            //back to days choice
            return [2 /*return*/, (0, additionfunc_1.addKeyboardDay)(ctx, undefined)];
        }
        //remember the day you chose
        ctx.scene.session.currentDay = ctx.match[0];
        //return to select times
        (0, additionfunc_1.addKeyboardTime)(ctx, ctx.match[0]);
        return [2 /*return*/, ctx.wizard.next()];
    });
}); });
//Handler for selected time and simulation multicheck
exports.timeHand.action(/1[0-8]|(any)/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //return to select times
            return [4 /*yield*/, (0, additionfunc_1.addKeyboardTime)(ctx, ctx.match[0])];
            case 1:
                //return to select times
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); });
//Handler for selected time and simulation multicheck
exports.endHand.action(/(1[0-8])|(any)/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //return to select times
            return [4 /*yield*/, (0, additionfunc_1.addKeyboardTime)(ctx, ctx.match[0])];
            case 1:
                //return to select times
                _a.sent();
                return [2 /*return*/, ctx.wizard.back()];
        }
    });
}); });
exports.endHand.action(/time_stop/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //append list of time to slot day if select timeslot is over
        //Update timeslot of days
        (0, additionfunc_1.updateTimeSlot)(ctx.scene.session);
        //return to select days
        (0, additionfunc_1.addKeyboardDay)(ctx, undefined);
        return [2 /*return*/, ctx.wizard.back()];
    });
}); });
