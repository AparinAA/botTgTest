import { Composer, Markup } from 'telegraf';
import {MyContext,list_lessons} from './additionConst';
import {addKeyboardDay, addKeyboardTime} from './additionfunc';


//export handlers
export const gradeHand = new Composer<MyContext>();
export const lessonHand = new Composer<MyContext>();
export const dayHand = new Composer<MyContext>();
export const urlHand = new Composer<MyContext>();
export const timeHand = new Composer<MyContext>();
export const endHand = new Composer<MyContext>();


gradeHand.on('text', async (ctx) => {
    
    if (Number(ctx.message.text)) {
        ctx.scene.session.age = ctx.message.text;
        await ctx.reply('В каком Вы классе?');
        return ctx.wizard.next();
    } else {
        return ctx.reply(`Что-то пошло не так 🤷‍♂️. Давайте попробуем еще раз

Сколько Вам лет? (Ребёнку)`);
    }
})

lessonHand.on('text', async (ctx) => {

    if (!Number(ctx.message.text)) {
        return ctx.reply(`Что-то пошло не так 🤷‍♂️. Давайте попробуем еще раз

В каком Вы классе?`);
    }
    ctx.scene.session.grade = ctx.message.text;
    await ctx.replyWithMarkdown(`
    На какое занятие пойдете?
    
*Занимательная математика*

Вы хотите погрузиться в мир интересной математики, научиться логически рассуждать и находить нестандартные решения.

*Школьная программа*

Вы хотите повторить школьную программу или продолжить обучение с того места, на котором остановились. 

*Подготовка к экзаменам*

Вы планируете поступать в школу зарубежом и обучаться на английском языке (подготовка к вступительным экзаменам).
`
    ,
        Markup.inlineKeyboard([
                [Markup.button.callback('Занимательная математика', 'day_math')],
                [Markup.button.callback('Школьная программа', 'day_repeat')],
                [Markup.button.callback('Подготовка к экзаменам', 'day_trainexam')],
                [Markup.button.callback('Свой вариант', 'day_myself')],
            ]
        )
    );
    return ctx.wizard.next();
})


//Handler choice lessons 
dayHand.action(/day_repeat/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];
    await ctx.editMessageText(`Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*
    
Укажите последнюю тему, которую вы помните`,
        {
            parse_mode: "Markdown"
        }
    );
    return ctx.wizard.next();
});

dayHand.action(/day_trainexam/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];
    await ctx.editMessageText(`Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*

Укажите сайт школы, в которую планируете поступать, или название и ссылку на пример экзамена`,
        {
            parse_mode: "Markdown"
        }
    );
    return ctx.wizard.next();
});

dayHand.action(/day_myself/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];
    await ctx.editMessageText(`Вы выбрали тип занятия - *${list_lessons[ctx.scene.session.lesson]}*

Укажите свой вариант занятия/подготовки`,
        {
            parse_mode: "Markdown"
        }
    );
    return ctx.wizard.next();
});

dayHand.action(/day_math/, async (ctx) => {
    ctx.scene.session.lesson = ctx.match[0];

    await addKeyboardDay(ctx,undefined);

    return ctx.wizard.selectStep(ctx.wizard.cursor + 2);
});

urlHand.on('text', async (ctx) => {
    if (ctx.scene.session.lesson === 'day_repeat') {
        ctx.scene.session.lastTopic = ctx.message.text;
        await addKeyboardDay(ctx,true);
        return ctx.wizard.next();
    } else if (ctx.scene.session.lesson === 'day_myself') {
        ctx.scene.session.myself = ctx.message.text;
        await addKeyboardDay(ctx,true);
        return ctx.wizard.next();
    } else if (ctx.scene.session.lesson === 'day_trainexam') {
        ctx.scene.session.url = ctx.message.text;
        await addKeyboardDay(ctx,true);
        return ctx.wizard.next();
    }
    

    if (!ctx.scene.session.lesson) {
        await ctx.deleteMessage();
        ctx.reply('Выберите занятие сверху!').then(
            ({ message_id }) => {
                setTimeout(() => ctx.deleteMessage(message_id),3000)
            }
        )
        return;
    }

});



timeHand.action(/time_.*/, async (ctx) => {
    if (ctx.match[0] === "time_stop") {
        if (ctx.scene.session.time?.length != 0) {
            if (ctx.scene.session.currentDay === 'time_any') {
                ctx.scene.session.time_m = undefined;
                ctx.scene.session.time_tu = undefined;
                ctx.scene.session.time_w = undefined;
                ctx.scene.session.time_th = undefined;
                ctx.scene.session.time_f = undefined;
                ctx.scene.session.time_sut = undefined;
                ctx.scene.session.time_sun = undefined;
            } else {
                ctx.scene.session.time_any = undefined;
            }
            ctx.scene.session[ctx.scene.session.currentDay] = ctx.scene.session.time;
        } else {
            ctx.scene.session[ctx.scene.session.currentDay] = undefined;
        }
        ctx.scene.session.time = [];
        return await addKeyboardDay(ctx,undefined);
    }
    ctx.scene.session.currentDay = ctx.match[0];
    addKeyboardTime(ctx,ctx.match[0]);
    return ctx.wizard.next();
     
});


timeHand.action(/1[0-8]|(any)/, async (ctx) => {
    await addKeyboardTime(ctx, ctx.match[0]);
    return ctx.wizard.next();
});


endHand.action(/(1[0-8])|(any)/, async (ctx) => {
    await addKeyboardTime(ctx,ctx.match[0]);
    return ctx.wizard.back();
});

endHand.action(/time_stop/, async (ctx) => {
    if (ctx.scene.session.time?.length != 0) {
        if (ctx.scene.session.currentDay === 'time_any') {
            ctx.scene.session.time_m = undefined;
            ctx.scene.session.time_tu = undefined;
            ctx.scene.session.time_w = undefined;
            ctx.scene.session.time_th = undefined;
            ctx.scene.session.time_f = undefined;
            ctx.scene.session.time_sut = undefined;
            ctx.scene.session.time_sun = undefined;
        } else {
            ctx.scene.session.time_any = undefined;
        }
        ctx.scene.session[ctx.scene.session.currentDay] = ctx.scene.session.time;
    } else {
        ctx.scene.session[ctx.scene.session.currentDay] = undefined;
    }

    ctx.scene.session.time = [];
    await addKeyboardDay(ctx,undefined);
    return ctx.wizard.back();
}); 
