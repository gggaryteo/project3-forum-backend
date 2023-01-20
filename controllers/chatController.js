const BaseController = require("./baseController")

class ChatController extends BaseController {
    constructor(model){
        super(model)
    }

    async getAllChat (req,res){
        try {
            const chat = await this.model.findAll()
            return res.json(chat)
        } 
        catch (error) {
            return res.status(400).json(error)
        }
        
    }
}

module.exports = ChatController