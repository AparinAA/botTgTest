import {list_lessons, list_days } from './additionConst';

import { Markup } from 'telegraf';

export function init(obj: any) {
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
    obj.time_f = undefined
    obj.time_sut = undefined;
    obj.time_sun = undefined;
    obj.time_any = undefined;
}

export function addKeyboardDay(ctx: any, data: boolean | undefined) {

    let msg: any;
    let d1: string;
    let d2: string;
    let d3: string;
    let d4: string;
    let d5: string;
    let d6: string;
    let d7: string;
    let d8: string;


    d1 = appendTime(ctx.scene.session.time_m, 'Понедельник');
    d2 = appendTime(ctx.scene.session.time_tu, 'Вторник');
    d3 = appendTime(ctx.scene.session.time_w, 'Среда');
    d4 = appendTime(ctx.scene.session.time_th, 'Четверг');
    d5 = appendTime(ctx.scene.session.time_f, 'Пятница');
    d6 = appendTime(ctx.scene.session.time_sut, 'Суббота');
    d7 = appendTime(ctx.scene.session.time_sun, 'Воскресенье');
    d8 = appendTime(ctx.scene.session.time_any, 'Любой день');
    

    let keybord = [
        [Markup.button.callback(d1, 'time_m')],
        [Markup.button.callback(d2, 'time_tu')],
        [Markup.button.callback(d3, 'time_w')],
        [Markup.button.callback(d4, 'time_th')],
        [Markup.button.callback(d5, 'time_f')],
        [Markup.button.callback(d6, 'time_sut')],
        [Markup.button.callback(d7, 'time_sun')],
        [Markup.button.callback(d8, 'time_any')],
        [Markup.button.callback(`Я выбрал`, 'day_stop')]
    ];

    if (!data) {
        msg = ctx.editMessageText(`
Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*
Выберите все подходящие дни`,
                {
                    parse_mode: "Markdown",
                    ...Markup.inlineKeyboard(keybord),
                }
            );
    } else {
        msg = ctx.replyWithMarkdown(`
Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*.
Выберите все подходящие дни`,
                        Markup.inlineKeyboard(keybord),
            );
    }
    return msg;
}

export function addKeyboardTime(ctx: any, data: string | undefined) {

    if (!ctx.scene.session.time) {
        ctx.scene.session.time = [];
    }

    if ( (ctx.scene.session.time.length === 0) && (ctx.scene.session[ctx.scene.session.currentDay] != undefined) ) {
        ctx.scene.session.time = ctx.scene.session[ctx.scene.session.currentDay];
    }
    
    if (Number(data)) {
        if (ctx.scene.session.time.indexOf(data) != -1) {
            const ind_time = ctx.scene.session.time.indexOf(data);
            ctx.scene.session.time.splice(ind_time,1);
        } else {
            if (ctx.scene.session.time.indexOf('any') != -1) {
                ctx.scene.session.time = [];
            }
            ctx.scene.session.time.push(data);
        }
    } else if (data === 'any') {
        ctx.scene.session.time = ctx.scene.session.time.indexOf(data) != -1 ? [] : ['any'];
    }
    
    const t1 = ctx.scene.session.time.indexOf('10') != -1 ? "✅" : "";
    const t2 = ctx.scene.session.time.indexOf('11') != -1 ? "✅" : "";
    const t3 = ctx.scene.session.time.indexOf('12') != -1 ? "✅" : "";
    const t4 = ctx.scene.session.time.indexOf('13') != -1 ? "✅" : "";
    const t5 = ctx.scene.session.time.indexOf('14') != -1 ? "✅" : "";
    const t6 = ctx.scene.session.time.indexOf('15') != -1 ? "✅" : "";
    const t7 = ctx.scene.session.time.indexOf('16') != -1 ? "✅" : "";
    const t8 = ctx.scene.session.time.indexOf('17') != -1 ? "✅" : "";
    const t9 = ctx.scene.session.time.indexOf('18') != -1 ? "✅" : "";
    const anyslot = ctx.scene.session.time.indexOf('any') != -1 ? "✅" : "";
    return ctx.editMessageText(`
*${list_days[ctx.scene.session.currentDay]}*
Выберите все подходящие варианты`,
            {
                reply_markup: {
                inline_keyboard: [
                    [
                        { text: t1 + "10:00", callback_data:  "10"},
                        { text: t2 + "11:00", callback_data:  "11"},
                        { text: t3 + "12:00", callback_data:  "12"},
                    ],
                    [
                        { text: t4 + "13:00", callback_data:  "13"},
                        { text: t5 + "14:00", callback_data:  "14"},
                        { text: t6 + "15:00", callback_data:  "15"},
                    ],
                    [
                        { text: t7 + "16:00", callback_data:  "16"},
                        { text: t8 + "17:00", callback_data:  "17"},
                        { text: t9 + "18:00", callback_data:  "18"},
                    ],
                    [
                        { text: anyslot + "Любое время", callback_data:  "any"},
                    ],
                    [
                        { text: "Я выбрал", callback_data:  "time_stop"},
                    ],
                ]
                },
                parse_mode: "Markdown"
            },
    );
}


export function checkDay(day: string[] | undefined) {
    if (day === undefined) {
        return 0;
    }
    if (day.length === 0) {
        return 0;
    }
    return 1;
}

export function renderDay(day: string[] | undefined | undefined, name: string) {
    day?.sort();
    if (checkAnyTime(day)) {
        return `*${list_days[name]}:* Любое время\n`
    }
    return checkDay(day) ? `*${list_days[name]}:* ${day?.join(":00, ")}:00\n` : ``;
}

export function renderListDay(sessionList: any) {
    let days_string = renderDay(sessionList.time_m,'time_m') +
    renderDay(sessionList.time_tu,'time_tu') +
    renderDay(sessionList.time_w,'time_w') +
    renderDay(sessionList.time_th,'time_th') +
    renderDay(sessionList.time_f,'time_f') +
    renderDay(sessionList.time_sut,'time_sut') +
    renderDay(sessionList.time_sun,'time_sun') +
    renderDay(sessionList.time_any, 'time_any');

    return days_string.length ? `\n*Выбрали удобное время:*\n` + days_string : `\n*Не выбрал ни одного дня.*`;
}

export function appendTime(day: string[] | undefined, name: string) {
    day?.sort();
    let str = checkDay(day) ? `✅` : ``;
    str += name;

    if (checkAnyTime(day)) {
        return str + ' (Любое время)';
    }
            
    str += checkDay(day) ? ` (` + day?.join(":00, ")?.concat(":00)") : ``;
    return str;
}

function checkAnyTime(day: string[]) {
    if (checkDay(day)) {
        if (day.indexOf('any') != -1) {
            return true;
        }
    }
    return false;
}

export function fromCtxToArray (ctx: any) {
    let data = new Date();
    return [
        [
            data.toISOString().slice(8,10) + "."
            + data.toISOString().slice(5,7) + " ",
            data.toTimeString().slice(0,5),
            data.toTimeString().split(' ')[1],
            ctx.userName,
            ctx.age,
            ctx.grade,
            list_lessons[ctx.lesson],
            ctx.lastTopic ?? '-',
            ctx.url ?? '-',
            ctx.myself ?? '-',
            checkAnyTime(ctx.time_m) ? 'Любое время' : ctx.time_m?.join(':00, ')?.concat(':00') ?? '-',
            checkAnyTime(ctx.time_tu) ? 'Любое время' : ctx.time_tu?.join(':00, ')?.concat(':00') ?? '-',
            checkAnyTime(ctx.time_w) ? 'Любое время' : ctx.time_w?.join(':00, ')?.concat(':00')?? '-',
            checkAnyTime(ctx.time_th) ? 'Любое время' : ctx.time_th?.join(':00, ')?.concat(':00') ?? '-',
            checkAnyTime(ctx.time_f) ? 'Любое время' : ctx.time_f?.join(':00, ')?.concat(':00') ?? '-',
            checkAnyTime(ctx.time_sut) ? 'Любое время' : ctx.time_sut?.join(':00, ')?.concat(':00') ?? '-',
            checkAnyTime(ctx.time_sun) ? 'Любое время' : ctx.time_sun?.join(':00, ')?.concat(':00') ?? '-',
            checkAnyTime(ctx.time_any) ? 'Любое время' : ctx.time_any?.join(':00, ')?.concat(':00') ?? '-'
        ]
    ];
}

