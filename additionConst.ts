import { Context, Scenes } from 'telegraf';

interface Lessons {
    [index: string] : string; 
    day_math:  string; 
    day_repeat: string;
    day_trainexam: string;
    day_myself: string;

}
export const list_lessons : Lessons = {
    'day_math': 'Занимательная математика',
    'day_repeat': 'Школьная программа',
    'day_trainexam': 'Подготовка к экзаменам',
    'day_myself' : 'Свой вариант',
}

interface Days {
    [index: string] : string; 
    time_m:  string; 
    time_tu: string;
    time_w: string;
    time_th: string;
    time_f: string;
    time_sut: string;
    time_sun: string;
    time_any: string;

}

export const list_days : Days = {
    'time_m':  'Понедельник', 
    'time_tu': 'Вторник',
    'time_w': 'Среда',
    'time_th': 'Четверг',
    'time_f': 'Пятница',
    'time_sut': 'Суббота',
    'time_sun': 'Воскресенье',
    'time_any': 'Любой день',
}

export interface MyWizardSession extends Scenes.WizardSessionData {
    [index: string]: any | string[] | string | undefined | number

    userId: number
    userName: string | undefined

    age: string
    grade: string
    lesson: string
    lastTopic: string | undefined
    url: string | undefined
    myself: string | undefined

    time: string[]

    currentDay : string
    
    time_m: any
    time_tu: any
    time_w: any
    time_th: any
    time_f: any
    time_sut: any
    time_sun: any
    time_any: any

}


export interface MyContext extends Context {
    myContextProp: string

    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>
    wizard: Scenes.WizardContextWizard<MyContext>
}