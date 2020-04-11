const { User, Profile } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/mail");
var otpGenerator = require("otp-generator");
const createToken = (user, secret, expiresIn) => {
  let { id, email } = user;
  const token = jwt.sign({ id, email }, secret, { expiresIn });
  return token;
};

module.exports = {
  Query: {
    users: async (parent, args, context, info) => {
      console.log('query users context.user: ' + context.user);
      const user = await User.findAll({
        include: [{ model: Profile }]
      });
      console.log('query users user: ' + user);
      return user;
    },
    user: async (parent, args, context, info) => {
      console.log('query user context.user: ' + context.user);

      const user = await User.findOne({
        where: { id: 1 },
        include: [{ model: Profile }]
      });
      console.log('query user user: ' + user);
      return user;
    }
  },

  Mutation: {
    createUser: async (parent, { email }) => {
      let otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false
      });

      const user = await User.create({ email, emailotp: otp });
      let profile = await Profile.create({});
      await user.setProfile(profile);
      let mailSent = await sendMail(
        "vybnmusicapp@gmail.com",
        email,
        "Email Verification",
        "Please copy and paste the otp from below",
        `
      <h3>Your otp is ${otp}</h3>
      `
      );
      let token = createToken(user, "toor", "30m");
      return { token };
    },

    forgetPassword: async (parent, { email }) => {
      let otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false
      });

      const user = await User.findOne({
        where: { email }
      });
      if (user) {
        let mailSent = await sendMail(
          "vybnmusicapp@gmail.com",
          email,
          "Email Verification",
          "Please copy and paste the otp from below",
          `
        <h3>Your otp is ${otp}</h3>
        `
        );
        let token = createToken(user, "toor", "30m");
        user.emailotp = otp;
        await user.save();
        return { token };
      } else throw new Error("Invalid Email");
    },

    verifyEmail: async (parent, { otp }, context) => {
      if (!context.user) {
        throw new Error("Invalid token");
      }
      console.log(context.user);
      let user = await User.findByPk(context.user.id);
      console.log("user");
      console.log(user);
      console.log(user.emailverified);
      if (user.emailotp == otp) {
        user.emailverified = true;
        await user.save();
        return true;
      }
      throw new Error("Invalid Otp");
    },

    createPassword: async (parent, { password }, context) => {
      if (!context.user) {
        throw new Error("Invalid token");
      }

      let user = await User.findByPk(context.user.id);
      if (user.emailverified) {
        let hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();
        return true;
      } else {
        throw new Error("Email not verified");
      }
    },

    login: async (parent, { email, password, authtype }, context) => {
      console.log("mutation login");
      console.log(context);
      if (authtype == "normal") {
        let user = await User.findOne({
          where: { email }
        });
        if (user) {
          console.log(user.password);
          let passwordValid = await bcrypt.compare(password, user.password);
          if (passwordValid) {
            let profile = await user.getProfile();
            console.log(profile.id);
            let tokenData = {
              id: user.id,
              email: user.email,
              profileId: profile.dataValues.id
            };
            console.log("tokendata", tokenData);
            let token = createToken(tokenData, "toor", "24h");
            return { token, redirectTo: "home" };
          } else throw new Error("Invalid password");
        } else {
          throw new Error("Invalid Email");
        }
      }
      if (authtype == "facebook") {
        let token;
        let user = await User.findOne({
          where: { email, facebookauth: true }
        });
        if (user) {
          token = createToken(
            { id: user.id, email: user.email },
            "toor",
            "30m"
          );
          return { token, redirectTo: "home" };
        } else {
          user = await User.create({
            email: email,
            facebookauth: true
          });
          let profile = await Profile.create({});
          await user.setProfile(profile);
          token = createToken(
            { id: user.id, email: user.email },
            "toor",
            "30m"
          );
          return { token, redirectTo: "createpassword" };
        }
      }

      if (authtype == "google") {
        let user = await User.findOne({
          where: { email, googleauth: true }
        });
        if (user) {
          token = createToken(
            { id: user.id, email: user.email },
            "toor",
            "30m"
          );
          return { token, redirectTo: "home" };
        } else {
          user = await User.create({
            email: email,
            googleauth: true
          });
          let profile = await Profile.create({});
          await user.setProfile(profile);
          token = createToken(
            { id: user.id, email: user.email },
            "toor",
            "30m"
          );
          return { token, redirectTo: "createpassword" };
        }
      }
    }
  }
};
