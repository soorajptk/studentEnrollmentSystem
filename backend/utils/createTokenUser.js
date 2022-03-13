const CreateTokenUser=(User)=>{
    return {name:User.name,role:User.role,userId:User._id}
}

module.exports=CreateTokenUser