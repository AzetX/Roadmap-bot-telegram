//описание экранов
const kb = require('./keyboard_buttons')


module.exports = {
    home: [   //кнопки главного экрана
         [kb.home.roadMapTechnology],
         [kb.home.coding, kb.home.analytics],   
         [kb.home.pr, kb.home.design],
         [kb.home.currentVacancy]
    ],
    coding: [
        [kb.coding.back_end, kb.coding.front_end],
        [kb.coding.devOps, kb.coding.ios],
        [kb.back]
    ],
    pr: [
        [kb.pr.seo],
        [kb.pr.smm, kb.pr.content_manager],
        [kb.back]
    ],
    analytics: [
        [kb.analytics.description],
        [kb.back]
    ],
    design: [
        [kb.design._3DAnimation],
        [kb.design.ui, kb.design.ux],
        [kb.back]
    ],
    location:[
        [kb.location, kb.back]
    ]
}