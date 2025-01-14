import { Telegraf,session } from 'telegraf'
import config from 'config'
import { message } from 'telegraf/filters'
import { model } from './gigachat.js'


const first= "Регламент выхода в отпуск\nIT-компания «Ромашка»\nВведение\nНастоящий Регламент устанавливает порядок оформления и предоставления ежегодных оплачиваемых отпусков сотрудникам IT-компании «Ромашка». Целью данного документа является обеспечение прозрачности процесса планирования отпусков, а также соблюдение прав работников и интересов работодателя.\nОсновные положения\n1. Общие принципы\n1.1. Все сотрудники имеют право на ежегодный оплачиваемый отпуск продолжительностью 28 календарных дней. Отпуск может предоставляться частями, но одна часть должна составлять не менее 14 календарных дней.\n1.2. Право на использование отпуска за первый год работы возникает у сотрудника через 6 месяцев непрерывной работы в компании. По соглашению между работником и работодателем отпуск может быть предоставлен и до истечения шести месяцев.\n1.3. График отпусков составляется ежегодно отделом кадров совместно с руководителями подразделений и утверждается генеральным директором не позднее чем за две недели до начала нового календарного года.\n2. Порядок подачи заявления на отпуск\n2.1. Для получения отпуска сотрудник обязан подать заявление не менее чем за 10 рабочих дней до предполагаемой даты начала отпуска. Заявление подается на имя непосредственного руководителя подразделения.\n2.2. Заявление должно содержать следующие данные:\no\tФИО сотрудника;\no\tДолжность;\no\tДата начала и окончания отпуска;\no\tПодпись сотрудника.\n2.3. Руководитель подразделения рассматривает заявление и принимает решение о согласовании либо отказе в предоставлении отпуска. При необходимости руководитель может предложить альтернативную дату отпуска, учитывая производственные потребности.\n2.4. После согласования с руководителем заявление передается в отдел кадров для оформления приказа о предоставлении отпуска.\n"
const second= "3. Оформление приказа на отпуск\n3.1. Отдел кадров оформляет приказ о предоставлении отпуска на основании согласованного заявления сотрудника и подписанного руководителем подразделения.\n3.2. Приказ оформляется в двух экземплярах: один экземпляр остается в отделе кадров, второй – передается сотруднику под роспись.\n3.3. Приказ должен содержать следующую информацию:\no\tФИО сотрудника;\no\tДолжность;\no\tПериод отпуска;\no\tОснование для предоставления отпуска (заявление);\no\tПодписи ответственных лиц (руководителя подразделения, начальника отдела кадров).\n4. Оплата отпуска\n4.1. Оплата отпуска производится не позднее чем за три дня до начала отпуска.\n4.2. Расчет отпускных осуществляется бухгалтерией на основе среднего заработка сотрудника за последние 12 месяцев.\n5. Перенос отпуска\n5.1. Отпуск может быть перенесен на другой срок по инициативе работника или работодателя. В случае переноса отпуска по инициативе работодателя необходимо получить письменное согласие сотрудника.\n"
const third= "5.2. Если перенос отпуска происходит по инициативе сотрудника, он должен подать новое заявление на отпуск с указанием новых дат. Процедура рассмотрения и утверждения аналогична процедуре первичной подачи заявления.\n6. Ответственность сторон\n6.1. Работник несет ответственность за своевременную подачу заявления на отпуск и соблюдение установленного графика отпусков.\n6.2. Руководители подразделений несут ответственность за согласование заявлений на отпуск и учет производственных потребностей при планировании отпусков своих подчиненных.\n6.3. Отдел кадров несет ответственность за правильное оформление документов и своевременное уведомление всех заинтересованных сторон о предстоящем отпуске.\n7. Заключительные положения\n7.1. Настоящий Регламент вступает в силу с момента его утверждения генеральным директором компании «Ромашка».\n7.2. Любые изменения и дополнения к настоящему Регламенту могут вноситься только после их утверждения генеральным директором.\n________________________________________\nПримерная структура заявления на отпуск:\nОтдел разработки ПО  \nРуководителю отдела Иванову Ивану Ивановичу  \nот старшего разработчика Петрова Петра Петровича  \n\nЗаявление  \n\nПрошу предоставить мне ежегодный оплачиваемый отпуск с __.__.____ по __.__.____ включительно.  \n\nДата: __.__.____  \nПодпись: ____________ /Петров П.П./\n"
const entr="Ты - ассистент сотрудников компании \\\"Ромашка\\\". Ты располагаешь Регламентом выхода в отпуск. Отвечай на вопросы сотрудников, касающихся этого регламента. Относись к сотруднику дружелюбно, избегай лишней формальности, вместо 'здравствуйте' говори 'привет'. В разговоре не выходи за рамки вопросов о регламенте (если сотрудник хочет обсудить что-то помимо регламента, вежливо и тактично откажи). Если у тебя спрашивают что-то наподобие 'что ты умеешь', говори, что ты можешь помочь с вопросами, касающимися выхода в отпуск, будь дружелюбна. ВАЖНО! Избегай оценочных суждений, по типу 'Хороший ли у нас регламент?'. Вежливо отказывай в ответе на такие вопросы. ВАЖНО! Отвечай на конкретные вопросы строго на основе текста, не придумывай дополнительную информацию. Например, если регламент связан с отпуском, а у тебя спрашивают про больничный, отвечай, что не можешь помочь, но вежливо!. Текст регламента: \\n\\n"
const cont=entr+first+second+third

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

function getSessionKey(ctx) {
  // Если сообщение от пользователя (private chat), используем его айди
  if (ctx.from.id) {
    return String(ctx.from.id);
  }
  // Если нет данных о пользователе, возвращаем null,
  // тогда сессия не будет сохраняться
  return null;
}

bot.use(session({ getSessionKey })) 

bot.command('new', initCommand)
bot.command('start', initCommand)

export const INITIAL_SESSION = {
  mess: [{"role":"system","content": cont}],

}

function cloneInitialSession() {
  return JSON.parse(JSON.stringify(INITIAL_SESSION));
}

export async function initCommand(ctx) {
  ctx.session = cloneInitialSession();
  await ctx.reply('Привет! Меня зовут Настя. Я могу ответить на вопросы, касающиеся регламента выхода в отпуск в компании Ромашка. Задавай вопросы!')
}
bot.on(message('text'), async (ctx) => {
  ctx.session ??= cloneInitialSession();
    try {
      await processTextToChat(ctx, ctx.message.text)
    } catch (e) {
      console.log(`Error while voice message`, e.message)
    }
})


export async function processTextToChat(ctx, content) {
    try {
    ctx.session.mess.push({"role":"user", "content":content})
    // пушим сообщения бота в сессию (в контекст)
    const response = await model.chatgen(ctx.session.mess)
    ctx.session.mess.push({"role": "assistant","content": response.content})
    await ctx.reply(response.content)
    //await ctx.reply(ctx.chat.id)

    } catch (e) {
      console.log('Error while proccesing text to gpt', e.message)
    }
  }

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))