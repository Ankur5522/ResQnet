import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  orgName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Organisation = mongoose.model('Organisation', organisationSchema);

export default Organisation
