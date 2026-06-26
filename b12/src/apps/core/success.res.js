
const status_message = require("./reasonCode")
const status_code = require("./statusCode")


class SuccessCustom {
    constructor({ message, status = status_code.OK , metadata = {}}){
        this.message = message
        this.status = status
        this.metadata = metadata
    }

    send (res) {
        return res.status(this.status).json(this)
    }
}


class Ok extends SuccessCustom {
    constructor({ message, status = status_code.OK , metadata = {} }) {
        super({ message, status ,  metadata })
    }
}
class Create extends SuccessCustom {
    constructor({ message, status = status_code.CREATED, metadata = {} }) {
        super({ message, status , metadata })
    }
}

module.exports = { Ok, Create }


