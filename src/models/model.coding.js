const mongoose = require ('mongoose')
const Schema = mongoose.Schema //созд. схемы

const CodingSchema = new Schema({
  name: {
      type:String,
      required:true
  },
  description:{
      type: String,
      required: true
  },
  language: {
      type: String,
      required: true
  },
  picture:{
      type: String,
      required: true
  }
})

mongoose.model('coding', CodingSchema)//создаем модель кодинг