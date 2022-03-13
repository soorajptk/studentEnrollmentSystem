const customApiError = require("./customError");
const {StatusCodes}=require('http-status-codes')
class notfound extends customApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.NOT_FOUND
    }
}
module.exports=notfound