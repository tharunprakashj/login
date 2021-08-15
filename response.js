module.exports.Response={
    _ErrorMessage(message){
        return{
            status:false,
            message:message
        }
    },
    _LoginResponse(user,token=undefined){
        return{
            status:true,
            message:"login success !!",
            data:user,
            token

        }
    },
    _SuccessResponse(message,data){
        return{
            status:true,
            message:message,
            data:data
        }
    }
}