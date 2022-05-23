/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import { Scenes, session, Telegraf } from 'telegraf';
import { init, renderListDay, fromCtxToArray} from './additionfunc';
import { apendDataGS } from './sheet';
import {list_lessons, MyContext } from './additionConst';
import {gradeHand, lessonHand, dayHand, urlHand, timeHand, endHand} from './handler';

const TOKEN_BOT = process.env.TOKEN_BOT;
const ID_CHANNEL = process.env.ID_CHANNEL;
const ID_CHAT_NOTI = process.env.ID_CHAT;

if (!TOKEN_BOT) {
    throw new Error('TOKEN_BOT must be provided!')
}


//Handler for selected time and simulation multicheck
timeHand.action(/day_stop/, async (ctx) => {

    //if user choice day_stop and finish poll
    await ctx.editMessageText(`Мы записали ваши пожелания:

*Занятие:* ${list_lessons[ctx.scene.session.lesson]}
${renderListDay(ctx.scene.session)}

Нажмите /start чтобы заполнить еще одну заявку`, {parse_mode: "Markdown"});

    let respone = `*Пользователь:* @${ctx.scene.session.userName ?? ''}.
*Возраст:* ${ctx.scene.session.age}
*Класс:* ${ctx.scene.session.grade}

*Занятие:* ${list_lessons[ctx.scene.session.lesson]}`;

    if (ctx.scene.session.lesson === "day_repeat" ) {
        respone += `
*Последняя тема:* ${ctx.scene.session.lastTopic}
`;
    }

    if (ctx.scene.session.url) {
        respone += `
*Ссылка на школу/экзамен:* ${ctx.scene.session.url}
`
    }

    if (ctx.scene.session.myself) {
        respone += `
*Свой вариант:* ${ctx.scene.session.myself}
`
    }

    respone += renderListDay(ctx.scene.session);

    //ctx.replyWithMarkdown(respone);

    //push notification in channel
    await bot.telegram.sendMessage(ID_CHANNEL, respone, {parse_mode: "Markdown"});
    
    //append new row with result of poll in Google Sheets
    apendDataGS(fromCtxToArray(ctx.scene.session));
    return ctx.scene.leave();
});

const bot = new Telegraf<MyContext>(TOKEN_BOT);
try {
    const superWizard = new Scenes.WizardScene(
        'super-wizard',
        async (ctx) => {
            ctx.scene.session.userId = ctx.from.id;
            ctx.scene.session.userName = ctx.from.username;
            
            init(ctx.scene.session);
            await ctx.replyWithMarkdown(`Привет!
    
Сколько Вам лет? (Ребёнку)`);
            return ctx.wizard.next();
        },
        gradeHand,
        lessonHand,
        dayHand,
        urlHand,
        timeHand,
        endHand,
    );
    
    
    const stage = new Scenes.Stage<MyContext>([superWizard]);

    bot.use(session());
    bot.use(stage.middleware());

    bot.start( ctx => ctx.scene.enter('super-wizard'));
    bot.launch()
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
} 
catch (e) {
    const error = "Throw error in bot. Error message: " + e.message;
    bot.telegram.sendMessage(ID_CHAT_NOTI,error);
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}