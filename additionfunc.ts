import {list_lessons, list_days } from './additionConst';

import { Markup } from 'telegraf';

export function init(obj: any) {
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
    obj.time_f = undefined
    obj.time_sut = undefined;
    obj.time_sun = undefined;
}

export function addKeyboardDay(ctx: any, data: boolean | undefined) {

    let msg: any;

    
    const d1 = appendTime(ctx.scene.session.time_m, 'Понедельник');
    const d2 = appendTime(ctx.scene.session.time_tu, 'Вторник');
    const d3 = appendTime(ctx.scene.session.time_w, 'Среда');
    const d4 = appendTime(ctx.scene.session.time_th, 'Четверг');
    const d5 = appendTime(ctx.scene.session.time_f, 'Пятница');
    const d6 = appendTime(ctx.scene.session.time_sut, 'Суббота');
    const d7 = appendTime(ctx.scene.session.time_sun, 'Воскресенье');

    let keybord = [
        [Markup.button.callback(d1, 'time_m')],
        [Markup.button.callback(d2, 'time_tu')],
        [Markup.button.callback(d3, 'time_w')],
        [Markup.button.callback(d4, 'time_th')],
        [Markup.button.callback(d5, 'time_f')],
        [Markup.button.callback(d6, 'time_sut')],
        [Markup.button.callback(d7, 'time_sun')],
        [Markup.button.callback(`Я выбрал`, 'day_stop')]
    ];

    if (!data) {
        msg = ctx.editMessageText(`
Выбрал занятие - *${list_lessons[ctx.scene.session.lesson]}*
Выбери удобные для себя дни (можно несколько)`,
                {
                    parse_mode: "Markdown",
                    ...Markup.inlineKeyboard(keybord),
                }
            );
    } else {
        msg = ctx.replyWithMarkdown(`
Выбрал занятие - *${list_lessons[ctx.scene.session.lesson]}*.
Выбери удобные для себя дни (можно несколько)`,
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
            ctx.scene.session.time.push(data);
        }
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
    return ctx.editMessageText(`
*${list_days[ctx.scene.session.currentDay]}*. Выбери удобное для себя время (можно несколько).`,
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
    let sday = day?.sort();
    return checkDay(day) ? `*${list_days[name]}:* ${day?.join(":00, ")}:00\n` : ``;
}

export function renderListDay(sessionList: any) {
    let days_string = renderDay(sessionList.time_m,'time_m') +
    renderDay(sessionList.time_tu,'time_tu') +
    renderDay(sessionList.time_w,'time_w') +
    renderDay(sessionList.time_th,'time_th') +
    renderDay(sessionList.time_f,'time_f') +
    renderDay(sessionList.time_sut,'time_sut') +
    renderDay(sessionList.time_sun,'time_sun');

    return days_string.length ? `\n*Выбрал удобное время:*\n` + days_string : `\n*Не выбрал ни одного дня.*`;
}

export function appendTime(day: string[] | undefined, name: string) {
    let sday = day?.sort();
    let str = checkDay(day) ? `✅` : ``;
    str += name;
    str += checkDay(day) ? ` (` + day?.join(":00, ")?.concat(":00)") : ``;
    return str;
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
            ctx.nameExam ?? '-',
            ctx.url ?? '-',
            ctx.time_m?.join(':00, ')?.concat(':00') ?? '-',
            ctx.time_tu?.join(':00, ')?.concat(':00') ?? '-',
            ctx.time_w?.join(':00, ')?.concat(':00')?? '-',
            ctx.time_th?.join(':00, ')?.concat(':00') ?? '-',
            ctx.time_f?.join(':00, ')?.concat(':00') ?? '-',
            ctx.time_sut?.join(':00, ')?.concat(':00') ?? '-',
            ctx.time_sun?.join(':00, ')?.concat(':00') ?? '-',
        ]
    ];

}