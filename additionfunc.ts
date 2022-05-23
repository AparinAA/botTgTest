import {list_lessons, list_days } from './additionConst';

import { Markup } from 'telegraf';

//'init' all data
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

//function adds keyboard with days selection
export function addKeyboardDay(ctx: any, data: boolean | undefined) {
    //init keyboard
    let keyboard = [
        [Markup.button.callback(appendTime(ctx.scene.session.time_m, 'Понедельник'), 'time_m')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_tu, 'Вторник'), 'time_tu')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_w, 'Среда'), 'time_w')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_th, 'Четверг'), 'time_th')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_f, 'Пятница'), 'time_f')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_sut, 'Суббота'), 'time_sut')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_sun, 'Воскресенье'), 'time_sun')],
        [Markup.button.callback(appendTime(ctx.scene.session.time_any, 'Любой день'), 'time_any')],
        [Markup.button.callback(`Я выбрал`, 'day_stop')]
    ];
    let msg: string;

    if (!data) {
        //if handler from lessons selesction
        msg = ctx.editMessageText(`
Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*
Выберите все подходящие дни`,
                {
                    parse_mode: "Markdown",
                    ...Markup.inlineKeyboard(keyboard),
                }
            );
    } else {
        //if handler from enter text (day_trainexam, day_repeat, day_myself)
        msg = ctx.replyWithMarkdown(`
Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*.
Выберите все подходящие дни`,
                        Markup.inlineKeyboard(keyboard),
            );
    }
    return msg;
}

//function adds keyboard with times selesction
export function addKeyboardTime(ctx: any, data: string | undefined) {

    if (!ctx.scene.session.time) {
        //check current array of time and clear him
        ctx.scene.session.time = [];
    }

    if ( (ctx.scene.session.time.length === 0) && (ctx.scene.session[ctx.scene.session.currentDay] != undefined) ) {
        //check current days timeslot array and shown this time
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
    

    return ctx.editMessageText(`
*${list_days[ctx.scene.session.currentDay]}*
Выберите все подходящие варианты`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: ctx.scene.session.time.indexOf("10") != -1 ? "✅10:00" : "10:00", callback_data: "10"},
                            { text: ctx.scene.session.time.indexOf("11") != -1 ? "✅11:00" : "11:00", callback_data: "11"},
                            { text: ctx.scene.session.time.indexOf("12") != -1 ? "✅12:00" : "12:00", callback_data: "12"},
                        ],
                        [
                            { text: ctx.scene.session.time.indexOf("13") != -1 ? "✅13:00" : "13:00", callback_data: "13"},
                            { text: ctx.scene.session.time.indexOf("14") != -1 ? "✅14:00" : "14:00", callback_data: "14"},
                            { text: ctx.scene.session.time.indexOf("15") != -1 ? "✅15:00" : "15:00", callback_data: "15"},
                        ],
                        [
                            { text: ctx.scene.session.time.indexOf("16") != -1 ? "✅16:00" : "16:00", callback_data: "16"},
                            { text: ctx.scene.session.time.indexOf("17") != -1 ? "✅17:00" : "17:00", callback_data: "17"},
                            { text: ctx.scene.session.time.indexOf("18") != -1 ? "✅18:00" : "18:00", callback_data: "18"},
                        ],
                        [
                            {text: ctx.scene.session.time.indexOf('any') != -1 ? "✅Любое время" : "Любое время", callback_data: "any"},
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
            data?.toISOString()?.slice(8,10) + "."
            + data?.toISOString()?.slice(5,7) + " ",
            data?.toTimeString()?.slice(0,5),
            data?.toTimeString()?.split(' ')[1],
            ctx.userId,
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

//delete excess message
export async function deleteMsg(ctx: any, text: string) {
    await ctx.deleteMessage();
    ctx.reply(text).then(
        ({ message_id }) => {
            setTimeout(() => ctx.deleteMessage(message_id),3000)
        }
    )
    return;
}

//Update timeslot of days and simulation multicheck for days
export function updateTimeSlot( session: any, ) {
    if (session.time?.length != 0) {
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
        } else {
            //reset time of 'any day' IF will selected any 
            session.time_any = undefined;
        }
        //append time of list to current day
        session[session.currentDay] = session.time;
    } else {
        //reset buffer time of list
        session[session.currentDay] = undefined;
    }
    //reset buffer time of list
    session.time = [];

    return;
}
