import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    passcode: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
usersSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      email: this.email,
      passcode: this.passcode
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};
const model = mongoose.model("User", usersSchema);

export const schema = model.schema;
export default model;
