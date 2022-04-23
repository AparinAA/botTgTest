/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import { Context, Composer, Markup, Scenes, session, Telegraf } from 'telegraf';
import { init,addKeyboardDay, addKeyboardTime, renderListDay, fromCtxToArray} from './additionfunc';
import { apendDataGS } from './sheet';
import {list_lessons, list_days } from './additionConst';

const TOKEN_BOT = process.env.TOKEN_BOT;
const ID_CHANNEL = process.env.ID_CHANNEL;
if (TOKEN_BOT === undefined) {
    throw new Error('TOKEN_BOT must be provided!')
}



interface MyWizardSession extends Scenes.WizardSessionData {
    [index: string]: any | string[] | string | undefined | number

    userId: number
    userName: string | undefined

    age: string
    grade: string
    lesson: string
    lastTopic: string | undefined
    nameExam: string | undefined
    url: string | undefined

    time: string[]

    currentDay : string
    
    time_m: any
    time_tu: any
    time_w: any
    time_th: any
    time_f: any
    time_sut: any
    time_sun: any

}


interface MyContext extends Context {
    myContextProp: string

    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>
    wizard: Scenes.WizardContextWizard<MyContext>
}

const gradeHand = new Composer<MyContext>()

gradeHand.on('text', async (ctx) => {
    
    if (Number(ctx.message.text)) {
        ctx.scene.session.age = ctx.message.text;
        await ctx.reply('В каком ты классе?');
        return ctx.wizard.next();
    } else {
        return ctx.reply(`Что-то не то. Давай попробуем еще раз

Сколько тебе лет?`);
    }
})

const lessonHand = new Composer<MyContext>()

lessonHand.on('text', async (ctx) => {

    if (!Number(ctx.message.text)) {
        return ctx.reply(`Что-то не то. Давай попробуем еще раз

В каком ты классе?`);
    }
    ctx.scene.session.grade = ctx.message.text;
    await ctx.replyWithMarkdown(`
    На какое занятие пойдешь?
*Текст*, поясняющий форматы занятий,
*Текст*, поясняющий форматы занятий,
*Текст*, поясняющий форматы занятий,
*Текст*, поясняющий форматы занятий,
*Текст*, поясняющий форматы занятий,
*Текст*, поясняющий форматы занятий,`,
        Markup.inlineKeyboard([
                [Markup.button.callback('Занимательная математика', 'day_math')],
                [Markup.button.callback('Ментальная арифметика', 'day_arith')],
                [Markup.button.callback('Хочу повторить школьную программу', 'day_repeat')],
                [Markup.button.callback('Подготовка к экзаменам', 'day_trainexam')],
            ]
        )
    );
    return ctx.wizard.next();
})

const dayHand = new Composer<MyContext>()

dayHand.action(/day_repeat/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];
    await ctx.editMessageText("Укажи последнюю тему, которую ты помнишь",
        {
            parse_mode: "Markdown"
        },
    );
    return ctx.wizard.next();
});

dayHand.action(/day_trainexam/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];
    await ctx.editMessageText("К какому экзамену нужна подготовка?",
        {
            parse_mode: "Markdown"
        },
    );
    return ctx.wizard.next();
});

dayHand.on('text', async (ctx) => {
    if (ctx.scene.session.lesson === 'day_repeat') {
        ctx.scene.session.lastTopic = ctx.message.text;
        await addKeyboardDay(ctx,true);
        return ctx.wizard.selectStep(ctx.wizard.cursor + 2);
    } else if (ctx.scene.session.lesson === 'day_trainexam') {
        ctx.scene.session.nameExam = ctx.message.text;
        await ctx.reply("Пришли сайт школы или ссылку на пример экзамена") 
        return ctx.wizard.next();
    }
    
    if (!ctx.scene.session.lesson) {
        ctx.deleteMessage();
        ctx.reply('Выбери сверху занятие');
        return;
    }

});

dayHand.action(/day_[am].*/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];

    await addKeyboardDay(ctx,undefined);

    return ctx.wizard.selectStep(ctx.wizard.cursor + 3);
});

const urlHand = new Composer<MyContext>()

urlHand.on('text', async (ctx) => {
    if (ctx.message.text) {
        if (ctx.scene.session.lesson === "day_trainexam" || ctx.scene.session.lesson === "day_trainexam") {
            if (ctx.scene.session.lesson === "day_trainexam") {
                ctx.scene.session.url = ctx.message.text;
            }
            await addKeyboardDay(ctx,true);
        }
    }
    return ctx.wizard.next();
});


const timeHand = new Composer<MyContext>()

timeHand.action(/time_.*/, async (ctx) => {

    if (ctx.match[0] === "time_stop") {
        if (ctx.scene.session.time != undefined) {
            if (ctx.scene.session.time.length != 0) {
                ctx.scene.session[ctx.scene.session.currentDay] = ctx.scene.session.time;
            } else {
                ctx.scene.session[ctx.scene.session.currentDay] = undefined;
            }
        } else {
            ctx.scene.session[ctx.scene.session.currentDay] = undefined;
        }
        ctx.scene.session.time = [];
        return addKeyboardDay(ctx,undefined);
    }
    ctx.scene.session.currentDay = ctx.match[0];
    addKeyboardTime(ctx,ctx.match[0]);
    return ctx.wizard.next();
     
});


timeHand.action(/1[0-8]/, async (ctx) => {
    await addKeyboardTime(ctx, ctx.match[0]);
    return ctx.wizard.next();
});

timeHand.action(/day_stop/, async (ctx) => {

    await ctx.editMessageText(`Мы записали твои пожелания:

*Занятие:* ${list_lessons[ctx.scene.session.lesson]}
${renderListDay(ctx.scene.session)}

Нажмите /start чтобы заполнить еще одну заявку`, {parse_mode: "Markdown"});

    let respone = `*Пользователь:* @${ctx.scene.session.userName}.
*Возраст:* ${ctx.scene.session.age}
*Класс:* ${ctx.scene.session.grade}

*Занятие:* ${list_lessons[ctx.scene.session.lesson]}
`;
    if (ctx.scene.session.lesson === "day_repeat" ) {
        respone += `
*Последняя тема:* ${ctx.scene.session.lastTopic}
`;
    }

    if (ctx.scene.session.nameExam) {
        respone += `
*Какой экзамен:* ${ctx.scene.session.nameExam}
*Ссылка на школу/экзамен:* ${ctx.scene.session.url}`
    }

    respone += renderListDay(ctx.scene.session);

    //ctx.replyWithMarkdown(respone);
    await bot.telegram.sendMessage(ID_CHANNEL, respone, {parse_mode: "Markdown"});
    
    apendDataGS(fromCtxToArray(ctx.scene.session));
    return ctx.scene.leave();
});

const endHand = new Composer<MyContext>()

endHand.action(/(time_stop)|(day_stop)|(1[0-8])/, async (ctx) => {
    if (ctx.match[0] === 'day_stop') {
        return ctx.wizard.next();
        
    } else if (ctx.match[0] === 'time_stop') {
        if (ctx.scene.session.time != undefined) {
            if (ctx.scene.session.time.length != 0) {
                ctx.scene.session[ctx.scene.session.currentDay] = ctx.scene.session.time;
            } else {
                ctx.scene.session[ctx.scene.session.currentDay] = undefined;
            }
        } else {
            ctx.scene.session[ctx.scene.session.currentDay] = undefined;
        }
        ctx.scene.session.time = [];
        await addKeyboardDay(ctx,undefined);
    } else {
        await addKeyboardTime(ctx,ctx.match[0]);
    }
    return ctx.wizard.back();
});

const superWizard = new Scenes.WizardScene(
    'super-wizard',
    async (ctx) => {
        ctx.scene.session.userId = ctx.from.id;
        ctx.scene.session.userName = ctx.from.username;
    
        init(ctx.scene.session);
        await ctx.replyWithMarkdown(`Привет!

Сколько тебе лет?`);
        return ctx.wizard.next();
    },
    gradeHand,
    lessonHand,
    dayHand,
    dayHand,
    urlHand,
    timeHand,
    endHand,
)

const bot = new Telegraf<MyContext>(TOKEN_BOT);
const stage = new Scenes.Stage<MyContext>([superWizard]);
bot.use(session())

bot.use(stage.middleware())

bot.start(ctx => ctx.scene.enter('super-wizard'));
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
