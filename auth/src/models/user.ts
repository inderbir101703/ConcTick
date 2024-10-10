import mongoose from "mongoose";
import { Password } from "../services/Password";

// describes a user
interface UserAttrs{
    email:string,
    password:string
}

//interface for userSchema else ts wont understand build function add to schema
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs):UserDoc

}


// describes properiies a user document has

interface UserDoc extends mongoose.Document{
    email:string,
    password:string
}
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    //toJSON works quite differently here in the worls of js here it is a object
    toJSON :{
           transform(doc,ret){
            ret.id=ret._id
             delete ret._id
            delete ret.password
            delete ret.__v
           }
    }
})
// whenever we want to add new functionality , add to atatics od userSchema
userSchema.statics.build=(attrs:UserAttrs)=>{
    return new User(attrs)
}
userSchema.pre('save', async function(done){
if(this.isModified('password')){
   const hash=await Password.toHash(this.get('password')) 
   this.set('password',hash)
}
done()
})
const User = mongoose.model<UserDoc,UserModel>('User',userSchema)


//below step is important to invovle typescript 
// create a own function and type checking
// const buildUser=(attrs:userAttrs)=>{
//     return new User(attrs)
// }
// const user=User.build({email:'asd',password:'asdsa'})
// user.e
export {User}
