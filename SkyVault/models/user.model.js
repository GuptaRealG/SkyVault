const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
        minlength:[3,'minimum length should be more than 3']
    },

    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
    }

   , password:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
    },
});
    
    


const user=mongoose.model('user',userSchema);

module.exports=user;

