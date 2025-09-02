import mongoose, { model, mongo } from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true,
      unique:true
    },
    password: {
      type: String,
      required:true
    },
    profile_image: {
      type: String,
      default:"https://app.manara.tech/_next/image?url=https%3A%2F%2Flite-production.s3.us-east-2.amazonaws.com%2Flearning_path_images%2Flp_card_images%2FAWS-1.png&w=1080&q=75"
    },
  },
  {
    timestamps: true,
  }
);


const User=mongoose.model('User',userSchema)



export default User;
