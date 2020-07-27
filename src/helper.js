//методы для бота

module.exports = {
 
    logStart(){
        console.log('Bot has been started...')
    },

    getChatId(msg){  //получаем id чата
        return msg.chat.id
    }


}