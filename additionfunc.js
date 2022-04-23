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
exports.__esModule = true;
exports.fromCtxToArray = exports.appendTime = exports.renderListDay = exports.renderDay = exports.checkDay = exports.addKeyboardTime = exports.addKeyboardDay = exports.init = void 0;
var additionConst_1 = require("./additionConst");
var telegraf_1 = require("telegraf");
function init(obj) {
    obj.age = '';
    obj.grade = '';
    obj.lesson = '';
    obj.lastTopic = undefined;
    obj.nameExam = undefined;
    obj.url = undefined;
    obj.time = [];
    obj.currentDay = '';
    obj.time_m = undefined;
    obj.time_tu = undefined;
    obj.time_w = undefined;
    obj.time_th = undefined;
    obj.time_f = undefined;
    obj.time_sut = undefined;
    obj.time_sun = undefined;
}
exports.init = init;
function addKeyboardDay(ctx, data) {
    var msg;
    var d1 = appendTime(ctx.scene.session.time_m, 'Понедельник');
    var d2 = appendTime(ctx.scene.session.time_tu, 'Вторник');
    var d3 = appendTime(ctx.scene.session.time_w, 'Среда');
    var d4 = appendTime(ctx.scene.session.time_th, 'Четверг');
    var d5 = appendTime(ctx.scene.session.time_f, 'Пятница');
    var d6 = appendTime(ctx.scene.session.time_sut, 'Суббота');
    var d7 = appendTime(ctx.scene.session.time_sun, 'Воскресенье');
    var keybord = [
        [telegraf_1.Markup.button.callback(d1, 'time_m')],
        [telegraf_1.Markup.button.callback(d2, 'time_tu')],
        [telegraf_1.Markup.button.callback(d3, 'time_w')],
        [telegraf_1.Markup.button.callback(d4, 'time_th')],
        [telegraf_1.Markup.button.callback(d5, 'time_f')],
        [telegraf_1.Markup.button.callback(d6, 'time_sut')],
        [telegraf_1.Markup.button.callback(d7, 'time_sun')],
        [telegraf_1.Markup.button.callback("\u042F \u0432\u044B\u0431\u0440\u0430\u043B", 'day_stop')]
    ];
    if (!data) {
        msg = ctx.editMessageText("\n\u0412\u044B\u0431\u0440\u0430\u043B \u0437\u0430\u043D\u044F\u0442\u0438\u0435 - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*\n\u0412\u044B\u0431\u0435\u0440\u0438 \u0443\u0434\u043E\u0431\u043D\u044B\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F \u0434\u043D\u0438 (\u043C\u043E\u0436\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E)"), __assign({ parse_mode: "Markdown" }, telegraf_1.Markup.inlineKeyboard(keybord)));
    }
    else {
        msg = ctx.replyWithMarkdown("\n\u0412\u044B\u0431\u0440\u0430\u043B \u0437\u0430\u043D\u044F\u0442\u0438\u0435 - *".concat(additionConst_1.list_lessons[ctx.scene.session.lesson], "*.\n\u0412\u044B\u0431\u0435\u0440\u0438 \u0443\u0434\u043E\u0431\u043D\u044B\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F \u0434\u043D\u0438 (\u043C\u043E\u0436\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E)"), telegraf_1.Markup.inlineKeyboard(keybord));
    }
    return msg;
}
exports.addKeyboardDay = addKeyboardDay;
function addKeyboardTime(ctx, data) {
    if (!ctx.scene.session.time) {
        ctx.scene.session.time = [];
    }
    if ((ctx.scene.session.time.length === 0) && (ctx.scene.session[ctx.scene.session.currentDay] != undefined)) {
        ctx.scene.session.time = ctx.scene.session[ctx.scene.session.currentDay];
    }
    if (Number(data)) {
        if (ctx.scene.session.time.indexOf(data) != -1) {
            var ind_time = ctx.scene.session.time.indexOf(data);
            ctx.scene.session.time.splice(ind_time, 1);
        }
        else {
            ctx.scene.session.time.push(data);
        }
    }
    var t1 = ctx.scene.session.time.indexOf('10') != -1 ? "✅" : "";
    var t2 = ctx.scene.session.time.indexOf('11') != -1 ? "✅" : "";
    var t3 = ctx.scene.session.time.indexOf('12') != -1 ? "✅" : "";
    var t4 = ctx.scene.session.time.indexOf('13') != -1 ? "✅" : "";
    var t5 = ctx.scene.session.time.indexOf('14') != -1 ? "✅" : "";
    var t6 = ctx.scene.session.time.indexOf('15') != -1 ? "✅" : "";
    var t7 = ctx.scene.session.time.indexOf('16') != -1 ? "✅" : "";
    var t8 = ctx.scene.session.time.indexOf('17') != -1 ? "✅" : "";
    var t9 = ctx.scene.session.time.indexOf('18') != -1 ? "✅" : "";
    return ctx.editMessageText("\n*".concat(additionConst_1.list_days[ctx.scene.session.currentDay], "*. \u0412\u044B\u0431\u0435\u0440\u0438 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F \u0432\u0440\u0435\u043C\u044F (\u043C\u043E\u0436\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E)."), {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: t1 + "10:00", callback_data: "10" },
                    { text: t2 + "11:00", callback_data: "11" },
                    { text: t3 + "12:00", callback_data: "12" },
                ],
                [
                    { text: t4 + "13:00", callback_data: "13" },
                    { text: t5 + "14:00", callback_data: "14" },
                    { text: t6 + "15:00", callback_data: "15" },
                ],
                [
                    { text: t7 + "16:00", callback_data: "16" },
                    { text: t8 + "17:00", callback_data: "17" },
                    { text: t9 + "18:00", callback_data: "18" },
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
    var sday = day === null || day === void 0 ? void 0 : day.sort();
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
        renderDay(sessionList.time_sun, 'time_sun');
    return days_string.length ? "\n*\u0412\u044B\u0431\u0440\u0430\u043B \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:*\n" + days_string : "\n*\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043B \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0434\u043D\u044F.*";
}
exports.renderListDay = renderListDay;
function appendTime(day, name) {
    var _a;
    var sday = day === null || day === void 0 ? void 0 : day.sort();
    var str = checkDay(day) ? "\u2705" : "";
    str += name;
    str += checkDay(day) ? " (" + ((_a = day === null || day === void 0 ? void 0 : day.join(":00, ")) === null || _a === void 0 ? void 0 : _a.concat(":00)")) : "";
    return str;
}
exports.appendTime = appendTime;
function fromCtxToArray(ctx) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    var data = new Date();
    return [
        [
            data.toISOString().slice(8, 10) + "."
                + data.toISOString().slice(5, 7) + " ",
            data.toTimeString().slice(0, 5),
            data.toTimeString().split(' ')[1],
            ctx.userName,
            ctx.age,
            ctx.grade,
            additionConst_1.list_lessons[ctx.lesson],
            (_a = ctx.lastTopic) !== null && _a !== void 0 ? _a : '-',
            (_b = ctx.nameExam) !== null && _b !== void 0 ? _b : '-',
            (_c = ctx.url) !== null && _c !== void 0 ? _c : '-',
            (_f = (_e = (_d = ctx.time_m) === null || _d === void 0 ? void 0 : _d.join(':00, ')) === null || _e === void 0 ? void 0 : _e.concat(':00')) !== null && _f !== void 0 ? _f : '-',
            (_j = (_h = (_g = ctx.time_tu) === null || _g === void 0 ? void 0 : _g.join(':00, ')) === null || _h === void 0 ? void 0 : _h.concat(':00')) !== null && _j !== void 0 ? _j : '-',
            (_m = (_l = (_k = ctx.time_w) === null || _k === void 0 ? void 0 : _k.join(':00, ')) === null || _l === void 0 ? void 0 : _l.concat(':00')) !== null && _m !== void 0 ? _m : '-',
            (_q = (_p = (_o = ctx.time_th) === null || _o === void 0 ? void 0 : _o.join(':00, ')) === null || _p === void 0 ? void 0 : _p.concat(':00')) !== null && _q !== void 0 ? _q : '-',
            (_t = (_s = (_r = ctx.time_f) === null || _r === void 0 ? void 0 : _r.join(':00, ')) === null || _s === void 0 ? void 0 : _s.concat(':00')) !== null && _t !== void 0 ? _t : '-',
            (_w = (_v = (_u = ctx.time_sut) === null || _u === void 0 ? void 0 : _u.join(':00, ')) === null || _v === void 0 ? void 0 : _v.concat(':00')) !== null && _w !== void 0 ? _w : '-',
            (_z = (_y = (_x = ctx.time_sun) === null || _x === void 0 ? void 0 : _x.join(':00, ')) === null || _y === void 0 ? void 0 : _y.concat(':00')) !== null && _z !== void 0 ? _z : '-',
        ]
    ];
}
exports.fromCtxToArray = fromCtxToArray;
