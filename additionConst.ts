interface Lessons {
    [index: string] : string; 
    day_math:  string; 
    day_arith: string;
    day_repeat: string;
    day_trainexam: string;
}
export const list_lessons : Lessons = {
    'day_math': 'Занимательная математика',
    'day_arith': 'Ментальная арифметика',
    'day_repeat': 'Хочу повторить школьную программу',
    'day_trainexam': 'Подготовка к экзаменам',
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
}

export const list_days : Days = {
    'time_m':  'Понедельник', 
    'time_tu': 'Вторник',
    'time_w': 'Среда',
    'time_th': 'Четверг',
    'time_f': 'Пятница',
    'time_sut': 'Суббота',
    'time_sun': 'Воскресенье',
}