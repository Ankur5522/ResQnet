import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  age: {
    type: Number,
  },
  aadharNumber: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['volunteer', 'help'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User

