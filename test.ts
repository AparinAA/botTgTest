/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import { Context, Composer, Markup, Scenes, session, Telegraf } from 'telegraf';

const TOKEN_BOT = "5157636388:AAGkA02jWhBu82d95EqN4Z1HskO2TB77xt0";
const ID_CHANNEL = process.env.ID_CHANNEL;
if (TOKEN_BOT === undefined) {
    throw new Error('TOKEN_BOT must be provided!')
}

const list_lessons = {
    'day_math': 'Занимательная математика',
    'day_arith': 'Ментальная арифметика',
    'day_repeat': 'Хочу повторить школьную программу',
    'day_trainexam': 'Подготовка к экзаменам',
}

const list_days = { 
    'time_m': 'Понедельник', 
    'time_tu': 'Вторник',
    'time_w': 'Среда',
    'time_th': 'Четверг',
    'time_f': 'Пятница',
    'time_sut': 'Суббота',
    'time_sun': 'Воскресенье',
}


interface MyWizardSession extends Scenes.WizardSessionData {
    userId: number
    userName: string

    age: string
    grade: string
    lesson: string
    lastTopic: string | undefined
    nameExam: string | undefined
    url: string | undefined

    days: string[]
    daysName: string[]
    time: string[]

    monday: string[]
    tuesday: string[]
    wednesday: string[]
    thursday: string[]
    friday: string[]
    saturday: string[]
    sunday: string[]

}


interface MyContext extends Context {
    myContextProp: string

    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>
    wizard: Scenes.WizardContextWizard<MyContext>
}

const ageHand = new Composer<MyContext>()

ageHand.command('start', async (ctx) => {
    ctx.scene.session.userId = ctx.from.id;
    ctx.scene.session.userName = ctx.from.username;

    await ctx.replyWithMarkdown(`Привет!

Сколько тебе лет?`);
    return ctx.wizard.next();
})


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
        await ctx.reply(`
        Выбери удобный для себя день`,
            Markup.inlineKeyboard([
                    [Markup.button.callback('Понедельник', 'time_m')],
                    [Markup.button.callback('Вторник', 'time_tu')],
                    [Markup.button.callback('Среда', 'time_w')],
                    [Markup.button.callback('Четверг', 'time_th')],
                    [Markup.button.callback('Пятница', 'time_f')],
                    [Markup.button.callback('Суббота', 'time_sut')],
                    [Markup.button.callback('Воскресенье', 'time_sun')],
                ]
            ),
        );
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

    await ctx.editMessageText(`
    Выбери удобные для себя дни`,
        Markup.inlineKeyboard([
                [Markup.button.callback('Понедельник', 'time_m')],
                [Markup.button.callback('Вторник', 'time_tu')],
                [Markup.button.callback('Среда', 'time_w')],
                [Markup.button.callback('Четверг', 'time_th')],
                [Markup.button.callback('Пятница', 'time_f')],
                [Markup.button.callback('Суббота', 'time_sut')],
                [Markup.button.callback('Воскресенье', 'time_sun')],
            ]
        ),
    );
    return ctx.wizard.selectStep(ctx.wizard.cursor + 3);
});

const urlHand = new Composer<MyContext>()

urlHand.on('text', async (ctx) => {
    if (ctx.message.text) {
        if (ctx.scene.session.lesson === "day_trainexam" || ctx.scene.session.lesson === "day_trainexam") {
            if (ctx.scene.session.lesson === "day_trainexam") {
                ctx.scene.session.url = ctx.message.text;
            }
            await ctx.reply(`
                Выбери удобные для себя дни`,
                Markup.inlineKeyboard([
                        [Markup.button.callback('Понедельник', 'time_m')],
                        [Markup.button.callback('Вторник', 'time_tu')],
                        [Markup.button.callback('Среда', 'time_w')],
                        [Markup.button.callback('Четверг', 'time_th')],
                        [Markup.button.callback('Пятница', 'time_f')],
                        [Markup.button.callback('Суббота', 'time_sut')],
                        [Markup.button.callback('Воскресенье', 'time_sun')],
                    ]
                ),
            );
        }
    }
    return ctx.wizard.next();
});


const timeHand = new Composer<MyContext>()

timeHand.action(/time_.*/, async (ctx) => {
    

    await ctx.editMessageText(`
    Выбери удобное время`,
        {

            reply_markup: {
            inline_keyboard: [
                [
                    { text: "10:00", callback_data:  "10"},
                    { text: "11:00", callback_data:  "11"},
                    { text: "12:00", callback_data:  "12"},
                ],
                [
                    { text: "13:00", callback_data:  "13"},
                    { text: "14:00", callback_data:  "14"},
                    { text: "15:00", callback_data:  "15"},
                ],
                [
                    { text: "16:00", callback_data:  "16"},
                    { text: "17:00", callback_data:  "17"},
                    { text: "18:00", callback_data:  "18"},
                ],
            ]
            },
            parse_mode: "Markdown",
        },
    );
    return ctx.wizard.next();
});




const superWizard = new Scenes.WizardScene(
    'super-wizard',
    ageHand,
    gradeHand,
    lessonHand,
    dayHand,
    dayHand,
    urlHand,
    timeHand,
    async (ctx) => {



        
        await ctx.editMessageText(`Записали результаты.
Ждите :)`);

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
*Ссылка на школу/экзамен:* ${ctx.scene.session.url}
`
            }

            respone += `
*Дни:* ${ctx.scene.session.daysName.join(', ')}
*Время:* ${ctx.scene.session.time.join(':00, ')}`+`:00`;

        ctx.replyWithMarkdown(respone);
    //await bot.telegram.sendMessage(ID_CHANNEL, respone, {parse_mode: "Markdown"});
        
        return ctx.scene.leave();
    },    
)

const bot = new Telegraf<MyContext>(TOKEN_BOT);
const stage = new Scenes.Stage<MyContext>([superWizard], {
    default: 'super-wizard',
})
bot.use(session())

bot.use(stage.middleware())
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))