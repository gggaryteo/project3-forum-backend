const express = require("express")
const router = express.Router()

class ChatRouter {
    constructor(controller){
        this.controller = controller
    }

    routes(){
        router.get("/getChat", this.controller.getAllChat.bind(this.controller))

        return router
    }

     
}

module.exports = ChatRouter