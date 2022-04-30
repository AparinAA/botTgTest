import { Composer, Markup } from 'telegraf';
import {MyContext,list_lessons} from './additionConst';
import {addKeyboardDay, addKeyboardTime, deleteMsg, updateTimeSlot} from './additionfunc';


//export handlers
export const gradeHand = new Composer<MyContext>();
export const lessonHand = new Composer<MyContext>();
export const dayHand = new Composer<MyContext>();
export const urlHand = new Composer<MyContext>();
export const timeHand = new Composer<MyContext>();
export const endHand = new Composer<MyContext>();


//handler for ask 'How old r u'?
gradeHand.on('text', async (ctx) => {
    
    if (Number(ctx.message.text)) {
        //Checking if the text is integer

        //entry age
        ctx.scene.session.age = ctx.message.text;
        await ctx.reply('В каком Вы классе?');
        return ctx.wizard.next();
    } else {
        //throw error and repeat 
        return ctx.reply(`Что-то пошло не так 🤷‍♂️. Давайте попробуем еще раз

Сколько Вам лет? (Ребёнку)`);
    }
})

//handler for ask 'what grade r u?'
lessonHand.on('text', async (ctx) => {

    if (!Number(ctx.message.text)) {
        //Checking if the text is integer and throw error and repeat enter
        return ctx.reply(`Что-то пошло не так 🤷‍♂️. Давайте попробуем еще раз

В каком Вы классе?`);
    }
    //entry grade
    ctx.scene.session.grade = ctx.message.text;
    //reply message description of lessons with keyboard select
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

    addKeyboardDay(ctx,undefined);

    //If choice option day_math then jump to next next handler
    return ctx.wizard.selectStep(ctx.wizard.cursor + 2);
});


//handler for text day_repeate, myself, trainexam
urlHand.on('text', async (ctx) => {
    if (ctx.scene.session.lesson === 'day_repeat') {
        //Last topic what r u remember
        ctx.scene.session.lastTopic = ctx.message.text;
    } else if (ctx.scene.session.lesson === 'day_myself') {
        //Own topic for lesson
        ctx.scene.session.myself = ctx.message.text;
    } else if (ctx.scene.session.lesson === 'day_trainexam') {
        //Url school or exam example
        ctx.scene.session.url = ctx.message.text;
    }

    //wish list of days
    addKeyboardDay(ctx,true);
    return ctx.wizard.next();
});


timeHand.action(/time_.*/, async (ctx) => {
    if (ctx.match[0] === "time_stop") {
        //append list of time to slot day if select timeslot is over
        
        //Update timeslot of days
        updateTimeSlot(ctx.scene.session);

        //back to days choice
        return addKeyboardDay(ctx,undefined);
    }

    //remember the day you chose
    ctx.scene.session.currentDay = ctx.match[0];

    //return to select times
    addKeyboardTime(ctx,ctx.match[0]);
    return ctx.wizard.next();
     
});


//Handler for selected time and simulation multicheck
timeHand.action(/1[0-8]|(any)/, async (ctx) => {
    //return to select times
    await addKeyboardTime(ctx, ctx.match[0]);
    return ctx.wizard.next();
});

//Handler for selected time and simulation multicheck
endHand.action(/(1[0-8])|(any)/, async (ctx) => {
    //return to select times
    await addKeyboardTime(ctx,ctx.match[0]);
    return ctx.wizard.back();
});

endHand.action(/time_stop/, async (ctx) => {
    //append list of time to slot day if select timeslot is over

    //Update timeslot of days
    updateTimeSlot(ctx.scene.session);
    
    //return to select days
    addKeyboardDay(ctx,undefined);
    return ctx.wizard.back();
}); 