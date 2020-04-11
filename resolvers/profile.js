const { User, Profile } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/mail");
var otpGenerator = require("otp-generator");
const stripe = require("stripe")("sk_test_mc3TRAdeZp430iYf5Mt05Ttj00LVEvcZf5");
const createToken = (user, secret, expiresIn) => {
  let { id, email } = user;
  const token = jwt.sign({ id, email }, secret, { expiresIn });
  return token;
};

module.exports = {
  Query: {
    profile: async (parent, args, context, info) => {
      // console.log("parent", parent);
      // console.log("args", args);
      // console.log("context", context);
      // console.log("info", info);
      console.log('user: ', context.user);
      if (context.user) {
        const user = await User.findOne({ where: { id: context.user.id } });
        const profile = user.getProfile();
        return profile;
      } else {
        return false;
      }
    }
      
  },

  Mutation: {
    updateProfile: async (
      parent,
      { profilePic, firstName, color_scheme, plan_type, privateProfile },
      context
    ) => {
      if (!context.user) throw new Error("Login to update profile");
      console.log(privateProfile);
      const user = await User.findOne({ where: { id: context.user.id } });
      const profile = await user.getProfile();

      await Profile.update(
        {
          profilePic,
          firstName,
          color_scheme,
          plan_type,
          private: privateProfile
        },
        { where: { id: profile.id } }
      );
      return true;
    },
    makePayment: async (parent, { token }, context) => {
      console.log('token: ', token);
      if (!context.user) throw new Error("Login to make payment");
      const user = await User.findOne({ where: { id: context.user.id } });
      const profile = await user.getProfile();

      return stripe.charges.create({
        amount: 499,
        currency: 'usd',
        source: token
      })
      .then(async charge => {
        console.log(charge);
        await Profile.update(
          {
            plan_type: "paid"
          },
          { where: { id: profile.id } }
        );
        return true;
        // New charge created on a new customer
      })
      .catch(err => {
        console.log(err);
        // throw new Error(err);
        // Deal with an error
        return false;
      });
    }
  }
};
