"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.updateTimeSlot = exports.deleteMsg = exports.fromCtxToArray = exports.appendTime = exports.renderListDay = exports.renderDay = exports.checkDay = exports.addKeyboardTime = exports.addKeyboardDay = exports.init = void 0;
var additionConst_1 = require("./additionConst");
var telegraf_1 = require("telegraf");
//'init' all data
function init(obj) {
    obj.age = '';
    obj.grade = '';
    obj.lesson = '';
    obj.lastTopic = undefined;
    obj.url = undefined;
    obj.myself = undefined;
    obj.time = [];
    obj.currentDay = '';
    obj.time_m = undefined;
    obj.time_tu = undefined;
    obj.time_w = undefined;
    obj.time_th = undefined;
    obj.time_f = undefined;
    obj.time_sut = undefined;
    obj.time_sun = undefined;
    obj.time_any = undefined;
}
exports.init = init;
//function adds keyboard with days selection
function addKeyboardDay(ctx, data) {
    //init keyboard
    var keyboard = [
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_m, 'Понедельник'), 'time_m')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_tu, 'Вторник'), 'time_tu')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_w, 'Среда'), 'time_w')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_th, 'Четверг'), 'time_th')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_f, 'Пятница'), 'time_f')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_sut, 'Суббота'), 'time_sut')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_sun, 'Воскресенье'), 'time_sun')],
        [telegraf_1.Markup.button.callback(appendTime(ctx.scene.session.time_any, 'Любой день'), 'time_any')],
        [telegraf_1.Markup.button.callback("\u042F \u0432\u044B\u0431\u0440\u0430\u043B", 'day_stop')]
    ];
    var msg;
    if (!data) {
        //if handler from lessons selesction
        msg = ctx.editMessageText("\n\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0442\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0438\u044F - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*\n\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0434\u043D\u0438"), __assign({ parse_mode: "Markdown" }, telegraf_1.Markup.inlineKeyboard(keyboard)));
    }
    else {
        //if handler from enter text (day_trainexam, day_repeat, day_myself)
        msg = ctx.replyWithMarkdown("\n\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0442\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0438\u044F - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*.\n\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0434\u043D\u0438"), telegraf_1.Markup.inlineKeyboard(keyboard));
    }
    return msg;
}
exports.addKeyboardDay = addKeyboardDay;
//function adds keyboard with times selesction
function addKeyboardTime(ctx, data) {
    if (!ctx.scene.session.time) {
        //check current array of time and clear him
        ctx.scene.session.time = [];
    }
    if ((ctx.scene.session.time.length === 0) && (ctx.scene.session[ctx.scene.session.currentDay] != undefined)) {
        //check current days timeslot array and shown this time
        ctx.scene.session.time = ctx.scene.session[ctx.scene.session.currentDay];
    }
    if (Number(data)) {
        if (ctx.scene.session.time.indexOf(data) != -1) {
            var ind_time = ctx.scene.session.time.indexOf(data);
            ctx.scene.session.time.splice(ind_time, 1);
        }
        else {
            if (ctx.scene.session.time.indexOf('any') != -1) {
                ctx.scene.session.time = [];
            }
            ctx.scene.session.time.push(data);
        }
    }
    else if (data === 'any') {
        ctx.scene.session.time = ctx.scene.session.time.indexOf(data) != -1 ? [] : ['any'];
    }
    return ctx.editMessageText("\n*".concat(additionConst_1.list_days[ctx.scene.session.currentDay], "*\n\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B"), {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: ctx.scene.session.time.indexOf("10") != -1 ? "✅10:00" : "10:00", callback_data: "10" },
                    { text: ctx.scene.session.time.indexOf("11") != -1 ? "✅11:00" : "11:00", callback_data: "11" },
                    { text: ctx.scene.session.time.indexOf("12") != -1 ? "✅12:00" : "12:00", callback_data: "12" },
                ],
                [
                    { text: ctx.scene.session.time.indexOf("13") != -1 ? "✅13:00" : "13:00", callback_data: "13" },
                    { text: ctx.scene.session.time.indexOf("14") != -1 ? "✅14:00" : "14:00", callback_data: "14" },
                    { text: ctx.scene.session.time.indexOf("15") != -1 ? "✅15:00" : "15:00", callback_data: "15" },
                ],
                [
                    { text: ctx.scene.session.time.indexOf("16") != -1 ? "✅16:00" : "16:00", callback_data: "16" },
                    { text: ctx.scene.session.time.indexOf("17") != -1 ? "✅17:00" : "17:00", callback_data: "17" },
                    { text: ctx.scene.session.time.indexOf("18") != -1 ? "✅18:00" : "18:00", callback_data: "18" },
                ],
                [
                    { text: ctx.scene.session.time.indexOf('any') != -1 ? "✅Любое время" : "Любое время", callback_data: "any" },
                ],
                [
                    { text: "Я выбрал", callback_data: "time_stop" },
                ],
            ]
        },
        parse_mode: "Markdown"
    });
}
exports.addKeyboardTime = addKeyboardTime;
function checkDay(day) {
    if (day === undefined) {
        return 0;
    }
    if (day.length === 0) {
        return 0;
    }
    return 1;
}
exports.checkDay = checkDay;
function renderDay(day, name) {
    day === null || day === void 0 ? void 0 : day.sort();
    if (checkAnyTime(day)) {
        return "*".concat(additionConst_1.list_days[name], ":* \u041B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F\n");
    }
    return checkDay(day) ? "*".concat(additionConst_1.list_days[name], ":* ").concat(day === null || day === void 0 ? void 0 : day.join(":00, "), ":00\n") : "";
}
exports.renderDay = renderDay;
function renderListDay(sessionList) {
    var days_string = renderDay(sessionList.time_m, 'time_m') +
        renderDay(sessionList.time_tu, 'time_tu') +
        renderDay(sessionList.time_w, 'time_w') +
        renderDay(sessionList.time_th, 'time_th') +
        renderDay(sessionList.time_f, 'time_f') +
        renderDay(sessionList.time_sut, 'time_sut') +
        renderDay(sessionList.time_sun, 'time_sun') +
        renderDay(sessionList.time_any, 'time_any');
    return days_string.length ? "\n*\u0412\u044B\u0431\u0440\u0430\u043B\u0438 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:*\n" + days_string : "\n*\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043B \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0434\u043D\u044F.*";
}
exports.renderListDay = renderListDay;
function appendTime(day, name) {
    var _a;
    day === null || day === void 0 ? void 0 : day.sort();
    var str = checkDay(day) ? "\u2705" : "";
    str += name;
    if (checkAnyTime(day)) {
        return str + ' (Любое время)';
    }
    str += checkDay(day) ? " (" + ((_a = day === null || day === void 0 ? void 0 : day.join(":00, ")) === null || _a === void 0 ? void 0 : _a.concat(":00)")) : "";
    return str;
}
exports.appendTime = appendTime;
function checkAnyTime(day) {
    if (checkDay(day)) {
        if (day.indexOf('any') != -1) {
            return true;
        }
    }
    return false;
}
function fromCtxToArray(ctx) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
    var data = new Date();
    return [
        [
            ((_a = data === null || data === void 0 ? void 0 : data.toISOString()) === null || _a === void 0 ? void 0 : _a.slice(8, 10)) + "."
                + ((_b = data === null || data === void 0 ? void 0 : data.toISOString()) === null || _b === void 0 ? void 0 : _b.slice(5, 7)) + " ",
            (_c = data === null || data === void 0 ? void 0 : data.toTimeString()) === null || _c === void 0 ? void 0 : _c.slice(0, 5),
            (_d = data === null || data === void 0 ? void 0 : data.toTimeString()) === null || _d === void 0 ? void 0 : _d.split(' ')[1],
            ctx.userId,
            ctx.userName,
            ctx.age,
            ctx.grade,
            additionConst_1.list_lessons[ctx.lesson],
            (_e = ctx.lastTopic) !== null && _e !== void 0 ? _e : '-',
            (_f = ctx.url) !== null && _f !== void 0 ? _f : '-',
            (_g = ctx.myself) !== null && _g !== void 0 ? _g : '-',
            checkAnyTime(ctx.time_m) ? 'Любое время' : (_k = (_j = (_h = ctx.time_m) === null || _h === void 0 ? void 0 : _h.join(':00, ')) === null || _j === void 0 ? void 0 : _j.concat(':00')) !== null && _k !== void 0 ? _k : '-',
            checkAnyTime(ctx.time_tu) ? 'Любое время' : (_o = (_m = (_l = ctx.time_tu) === null || _l === void 0 ? void 0 : _l.join(':00, ')) === null || _m === void 0 ? void 0 : _m.concat(':00')) !== null && _o !== void 0 ? _o : '-',
            checkAnyTime(ctx.time_w) ? 'Любое время' : (_r = (_q = (_p = ctx.time_w) === null || _p === void 0 ? void 0 : _p.join(':00, ')) === null || _q === void 0 ? void 0 : _q.concat(':00')) !== null && _r !== void 0 ? _r : '-',
            checkAnyTime(ctx.time_th) ? 'Любое время' : (_u = (_t = (_s = ctx.time_th) === null || _s === void 0 ? void 0 : _s.join(':00, ')) === null || _t === void 0 ? void 0 : _t.concat(':00')) !== null && _u !== void 0 ? _u : '-',
            checkAnyTime(ctx.time_f) ? 'Любое время' : (_x = (_w = (_v = ctx.time_f) === null || _v === void 0 ? void 0 : _v.join(':00, ')) === null || _w === void 0 ? void 0 : _w.concat(':00')) !== null && _x !== void 0 ? _x : '-',
            checkAnyTime(ctx.time_sut) ? 'Любое время' : (_0 = (_z = (_y = ctx.time_sut) === null || _y === void 0 ? void 0 : _y.join(':00, ')) === null || _z === void 0 ? void 0 : _z.concat(':00')) !== null && _0 !== void 0 ? _0 : '-',
            checkAnyTime(ctx.time_sun) ? 'Любое время' : (_3 = (_2 = (_1 = ctx.time_sun) === null || _1 === void 0 ? void 0 : _1.join(':00, ')) === null || _2 === void 0 ? void 0 : _2.concat(':00')) !== null && _3 !== void 0 ? _3 : '-',
            checkAnyTime(ctx.time_any) ? 'Любое время' : (_6 = (_5 = (_4 = ctx.time_any) === null || _4 === void 0 ? void 0 : _4.join(':00, ')) === null || _5 === void 0 ? void 0 : _5.concat(':00')) !== null && _6 !== void 0 ? _6 : '-'
        ]
    ];
}
exports.fromCtxToArray = fromCtxToArray;
//delete excess message
function deleteMsg(ctx, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.deleteMessage()];
                case 1:
                    _a.sent();
                    ctx.reply(text).then(function (_a) {
                        var message_id = _a.message_id;
                        setTimeout(function () { return ctx.deleteMessage(message_id); }, 3000);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteMsg = deleteMsg;
//Update timeslot of days and simulation multicheck for days
function updateTimeSlot(session) {
    var _a;
    if (((_a = session.time) === null || _a === void 0 ? void 0 : _a.length) != 0) {
        //append if list of time is not equal to NULL
        if (session.currentDay === 'time_any') {
            //reset all time of days IF will selected 'any day'
            session.time_m = undefined;
            session.time_tu = undefined;
            session.time_w = undefined;
            session.time_th = undefined;
            session.time_f = undefined;
            session.time_sut = undefined;
            session.time_sun = undefined;
        }
        else {
            //reset time of 'any day' IF will selected any 
            session.time_any = undefined;
        }
        //append time of list to current day
        session[session.currentDay] = session.time;
    }
    else {
        //reset buffer time of list
        session[session.currentDay] = undefined;
    }
    //reset buffer time of list
    session.time = [];
    return;
}
exports.updateTimeSlot = updateTimeSlot;
