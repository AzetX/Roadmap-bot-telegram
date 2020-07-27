const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')
const config = require('./config')
const helper = require('./helper')
const path = require('path')
const keyboard = require('./keyboard')//подключаем клавы
const kb = require('./keyboard_buttons')//описание клав
const database = require('../database.json')
const { coding } = require('./keyboard_buttons')
const descrip  = require('./descrip')
const { KeyObject } = require('crypto')
const { request } = require('http')
// const request = require('request-promise')

helper.logStart()

// mongoose.Promise = global.Promise
// mongoose.connect(config.DB_URL, {
//   useMongoClient: true //корректная работа
// })//активация бд
//   .then(() => console.log('Successfully connected'))
//   .catch((err) => err)


// require('./models/model.coding')

// const Coding = mongoose.model('coding')

// database.coding.forEach(element => {
//     new Coding (element).save().catch(e => console.log(e))
// }); //получаем элемент




//---------------------------------------------------------------

const bot = new TelegramBot(config.TOKEN, {
  polling: true
})

// console.log(descrip)
//coding.back_end

bot.on('message', (msg) => {    
    const chatId = helper.getChatId(msg)
    // const captionCoding = `Наименование: ${}\nОписание: ${coding.descr}\nНавыки: ${descrip.coding[0].skills}\nЗарплата: ${descrip.coding[0].salary}`
    const textAboutRoadmap = `<strong>Информация:</strong>\nНезависимо от того, хотите ли вы руководить собственной компанией или захватить угловой офис на своей нынешней работе, у вас, вероятно, есть конечная цель для вашей карьеры.\nНо вы действительно знаете, что вам нужно сделать, чтобы туда добраться? Чтобы получить реалистичное представление о том, что нужно предпринять для достижения своих карьерных устремлений, необходимо создать «дорожную карту», ​​в которой изложены шаги, которые необходимо предпринять для достижения своих целей.\n<strong>Полезные материалы:</strong>\n<i>1) <a href="https://www.businessnewsdaily.com/">Mapping out a path to your ultimate dream job.</a></i>\n<i>2) <a href="https://en.wikipedia.org/wiki/Technology_roadmap">About Roadmap</a></i>\n<i>3) <a href="https://www.cuttles.io/">Create Roadmap</a></i>`

    switch (msg.text) {  //сравнииваем выражение
        case kb.home.roadMapTechnology:  //msg.text совпадает с копкой ? обрабатываем
         bot.sendMessage(chatId, textAboutRoadmap, {
             disable_web_page_preview: true,
             parse_mode:'HTML'
          
         })
        
          break;
        case kb.home.coding:
          bot.sendMessage(chatId, `Раздел разработки ПО`, {
            reply_markup: {
              keyboard: keyboard.coding
            }
        }
          )
          break;
        case kb.home.analytics:
          bot.sendMessage(chatId, `Раздел аналитика`, {
            reply_markup: {
              keyboard: keyboard.analytics
              }
          })
          break;
        case kb.home.pr: 
          bot.sendMessage(chatId, `Раздел реклама`, {
            reply_markup: {
              keyboard: keyboard.pr
              }
          })
          break;
        case kb.home.design:
            bot.sendMessage(chatId, `Раздел дизайн`, {
                reply_markup: {
                  keyboard: keyboard.design
                }
            })
          break;
        case kb.home.currentVacancy:
            bot.sendMessage(chatId, 'Раздел вакансии', {
                reply_markup:{
                  keyboard: keyboard.location
                }
            })
          break; 
       
        case kb.coding.back_end://Если id === 1, то получаем объект, подставляем данные и отправляем пользователю
       
          // bot.sendPhoto(chatId, coding.picture, {
          //   caption: `daad`
          // })
          getDataCoding(chatId, 1)
          break;

        case kb.coding.front_end:
          getDataCoding(chatId, 2)
          break;

        case kb.coding.devOps:
          getDataCoding(chatId, 3)
          break;

        case kb.coding.ios:
          getDataCoding(chatId, 4)
          break;

        case kb.analytics.description:
          getDataAnalitycs(chatId, 5)
          break;

        case kb.pr.seo:
          getDataPr(chatId, 6)
          break;

        case kb.pr.content_manager:
          getDataPr(chatId, 8)
          break;

        case kb.pr.smm:
          getDataPr(chatId, 7)
          break;


        case kb.design.ui:
            getDataDesign(chatId, 9)
          break;


        case kb.design._3DAnimation:
          getDataDesign(chatId, 10)
          break;

        case kb.design.ux:
          getDataDesign(chatId, 11)
          break;
        
        case kb.location:
          bot.sendMessage(chatId, 'Отправляю местоположение', {
          reply_markup:{
                       
            }
            
          
          })
          break;


         




          case kb.back: 
          bot.sendMessage(chatId, 'Выберите интересующий раздел', {
            reply_markup: {
              keyboard: keyboard.home
          } //вернуться на главный экран
          
          })
          break;
          // default: 
          // bot.sendMessage(chatId, `Мэн не понял`)
          // break;
      
      }



})



bot.onText(/\/start/, msg => {
  
  const text = `Привет, ${msg.from.first_name}!\nДанный бот является дорожной картой востребованных IT-специальностей.\nВыберите команду для продолжения работы:`

  bot.sendMessage(helper.getChatId(msg), text, {
      reply_markup: {   //отправляем юзеру клавиатуру
        keyboard: keyboard.home
      
      }
  })  


})

// ======


function getDataCoding(chatId, id){
 const data = descrip.coding.find(i => i.id == id )
    console.log(data)

    const html = `<strong><em>Наименование:</em></strong>\n${data.name}\n<strong><em>Описание:</em></strong>\n${data.descr}\n<strong><em>Минимальные скиллы:</em></strong>\n${data.skills}\n<strong><em>Средняя зарплата:</em></strong>\n${data.salary}`
   
    bot.sendPhoto(chatId, data.picture, {
      caption: html,
      parse_mode:'HTML'
    })
}


function getDataAnalitycs(chatId, id){
  const data = descrip.analytics.find(i => i.id == id )
     console.log(data)
 
     const html = `<strong><em>Наименование:</em></strong>\n${data.name}\n<strong><em>Описание:</em></strong>\n${data.descr}\n<strong><em>Минимальные скиллы:</em></strong>\n${data.skills}\n<strong><em>Средняя зарплата:</em></strong>\n${data.salary}`
    
     bot.sendPhoto(chatId, data.picture, {
       caption: html,
       parse_mode:'HTML'
     })
 }
 
 function getDataPr(chatId, id){
  const data = descrip.pr.find(i => i.id == id )
     console.log(data)
 
     const html = `<strong><em>Наименование:</em></strong>\n${data.name}\n<strong><em>Описание:</em></strong>\n${data.descr}\n<strong><em>Минимальные скиллы:</em></strong>\n${data.skills}\n<strong><em>Средняя зарплата:</em></strong>\n${data.salary}`
    
     bot.sendPhoto(chatId, data.picture, {
       caption: html,
       parse_mode:'HTML'
     })
 }
 
 function getDataDesign(chatId, id){
  const data = descrip.design.find(i => i.id == id )
     console.log(data)
 
     const html = `<strong><em>Наименование:</em></strong>\n${data.name}\n<strong><em>Описание:</em></strong>\n${data.descr}\n<strong><em>Минимальные скиллы:</em></strong>\n${data.skills}\n<strong><em>Средняя зарплата:</em></strong>\n${data.salary}`
    
     bot.sendPhoto(chatId, data.picture, {
       caption: html,
       parse_mode:'HTML'
     })
 }
 








//Майби использовать ф.Конструкцию или класс? гыг