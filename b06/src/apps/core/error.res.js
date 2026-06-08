const status_message = require("./reasonCode")
const status_code = require("./statusCode")


class ErrorCustom extends Error {
    constructor( message , status) {
        super(message),
        this.status = status
    }
}


class BAD_REQUEST_ERROR extends ErrorCustom {
    constructor(message = status_message.BAD_REQUEST, status = status_code.BAD_REQUEST) {
        super(message, status)
    }
}

class UNAUTHORIZED_ERROR extends ErrorCustom {
    constructor(message = status_message.UNAUTHORIZED, status = status_code.UNAUTHORIZED) {
        super(message, status)
    }
}
class TOO_MANY_REQUESTS_ERROR extends ErrorCustom {
    constructor(message = status_message.TOO_MANY_REQUESTS, status = status_code.TOO_MANY_REQUESTS) {
        super(message, status)
    }
}



module.exports = {
    ErrorCustom,
    BAD_REQUEST_ERROR,
    UNAUTHORIZED_ERROR,
    TOO_MANY_REQUESTS_ERROR
}