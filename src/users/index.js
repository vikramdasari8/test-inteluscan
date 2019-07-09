import Users from "./model";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const CreateUsers = async (request, h) => {
  try {
    var authToken = request.headers.authorization;
    console.log("Auth", authToken);
    if (!authToken)
      return h.response({
        auth: false,
        Message: "No token provided.",
        status: 401
      });
    try {
      var decoded = jwt.verify(authToken, process.env.secret);
      console.log("Token Decode", decoded);
      const reqPayload = new Users(request.payload);
      const savePayload = await reqPayload.save();
      return h.response(savePayload);
    } catch (err) {
      console.log("Error Decoded Token", err.message);
      return h.response({ Message: "Token Expired" });
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

const VerifyToken = jwttoken => {
  console.log("Token Passed", jwttoken);
  try {
    var decoded = jwt.verify(authToken, process.env.secret);
    console.log("Decoded Token", decoded);

    return true;
  } catch (err) {
    console.log("Error Decoded Token", err.message);
    return false;
  }
};

//Get All Contactus  details
export const AllUsers = async (request, h) => {
  try {
    var authToken = request.headers.authorization;
    console.log("Auth", authToken);
    if (!authToken)
      return h.response({
        auth: false,
        Message: "No token provided.",
        status: 401
      });
    try {
      var decoded = jwt.verify(authToken, process.env.secret);
      console.log("Decoded Token", decoded);
      const lstAllUsers = await Users.find().exec();
      return h.response(lstAllUsers);
    } catch (err) {
      console.log("Error Decoded Token", err.message);
      return h.response({ Message: "Token Expired" });
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Update Contactus based on ID
export const UpdateUsersById = async (request, h) => {
  try {
    var result = await Users.findByIdAndUpdate(
      request.params.id,
      request.payload,
      { new: true }
    );
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Delete Contactus based on id
export const DeleteUsersById = async (request, h) => {
  try {
    const result = await Users.deleteOne({ _id: request.params.id });
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};

export const ValidateUsers = async (request, h) => {
  try {
    var result = await Users.find(request.payload);
    // res.status(200).send({ auth: true, token: token });
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    console.log("Length", result.length, "----", request.payload.name);
    if (result.length > 0) {
      var token = jwt.sign({ id: request.payload.name }, process.env.secret, {
        expiresIn: 100 // expires in 24 hours
      });
      return h.response({ Message: "Success", token: token }).code(200);
    } else return h.response({ Message: "Invalid login details" });

    // return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};
