import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('yo bro'))

    
    await mongoose.connect(`${process.env.MONGODB_URI}herman_watches`)

}

export default connectDB;