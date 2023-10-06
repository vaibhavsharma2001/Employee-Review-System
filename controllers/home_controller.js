const User = require('../models/userModel');
//deleteByAdmin
module.exports.deleteByAdmin = async function (req, res) {
  try {
    let guyToBedeleted = req.params.name;
    let deletedUser = await User.findOneAndDelete(
      { name: guyToBedeleted },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          return res.redirect('back');
        }
      }
    );
    return res.redirect('back');
  } catch (error) {
    console.log(error.message);
  }
};
//changePassword
module.exports.changePassword = async function (req, res) {
  try {
    let data = req.body;
    console.log('changePass :', data.email);
    console.log('changePass :', data.password);
    console.log('changePass :', data.password1);
    if (data.password != data.password1) {
      return res.redirect('back');
    } else {
      let updatedUser = await User.findOneAndUpdate(
        { email: data.email },
        {
          password: data.password,
        }
      );
      return res.redirect('/login');
    }
  } catch (error) {
    console.log(error.message);
  }
};
//forgotPwd
module.exports.forgotPwd = function (req, res) {
  try {
    return res.render('ForgotPasswordpage', {
      title: 'ForgotPasswordpage',
    });
  } catch (error) {
    console.log(error.message);
  }
};
//review form save
module.exports.reviewFormSave = async function (req, res) {
  try {
    let reviewResults = JSON.parse(JSON.stringify(req.body));
    let reviewfor = req.params.name;
    console.log('reviewResults: ', reviewResults);

    let sumNumber =
      Number(reviewResults.field1) +
      Number(reviewResults.field2) +
      Number(reviewResults.field3) +
      Number(reviewResults.field4) +
      Number(reviewResults.field5);
    console.log('reviewFor: ', reviewfor);
    let updatedUser = await User.findOneAndUpdate(
      { name: reviewfor },
      {
        $push: { reviewsGotten: sumNumber },
      }
    );
    //delete the entry of user given review from db--vk from am
    console.log('updated User Reviews: ', updatedUser);
    let updatedReviewGivers = await User.findOneAndUpdate(
      { email: req.session.useremail },
      {
        $pop: { reviewsToBeGiven: -1 },
      }
    );
    console.log('updated User Reviews: ', updatedReviewGivers);
    return res.redirect('back');
  } catch (error) {
    console.log(error.message);
  }
};
//review form get
module.exports.reviewFormGet = async function (req, res) {
  try {
    let nameOfcandidate = req.params.name;
    console.log('nameOfcandidtae :', nameOfcandidate);
    let loggedInUser = req.session.useremail;
    let loggedInUserData = await User.find({ email: loggedInUser });
    return res.render('reviewFile', {
      title: 'ReviewForm',
      data: nameOfcandidate,
      loggedUser: loggedInUserData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
//assign review
module.exports.assignReview = async function (req, res) {
  try {
    let assigned = req.body.names;
    let candidate = req.params.candidateName;
    console.log('assigned', candidate);
    console.log('assigned : ', assigned);
    for (let i = 0; i < assigned.length; i++) {
      let updatedUser = await User.findOneAndUpdate(
        { name: assigned[i] },
        {
          $push: { reviewsToBeGiven: candidate },
        }
      );
      console.log('updated User Reviews: ', updatedUser);
    }

    return res.redirect('back');
  } catch (error) {
    console.log(error.message);
  }
};
//updateByAdmin
module.exports.updateByAdmin = async function (req, res) {
  try {
    let update = req.body;
    let userEmail = req.params.name;
    console.log('updated role:', update.role);
    let updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      {
        role: update.role,
      }
    );
    console.log('updated User:', updatedUser);
    return res.redirect('back');
  } catch (error) {
    console.log(error.message);
  }
};
//createByadmin
module.exports.createByAdmin = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  try {
    let userInfo = await User.create(req.body);
    console.log('userinfo is here By Admin:', userInfo);
    return res.redirect('back');
  } catch (error) {
    console.log(error.message);
  }
};
//ProfileVisitByadmin
module.exports.profileVisitByAdmin = async function (req, res) {
  let userName = req.params.name;
  let loggedInAdmin = req.session.useremail;
  let userData = await User.find({ name: userName });
  let adminData = await User.find({ email: loggedInAdmin });
  let alluserData = await User.find({});
  console.log('this is userData :', userData);
  console.log('this is adminData : ', adminData);
  let totalReviewsArray = userData[0].reviewsGotten.reduce((a, b) => a + b, 0);
  let totalReviewsArrayLength = userData[0].reviewsGotten.length;
  console.log('totalReviewsArray :', totalReviewsArray);
  console.log('totalReviewsArrayLength :', totalReviewsArrayLength);
  let netScore = Math.round(totalReviewsArray / totalReviewsArrayLength);
  return res.render('profile_visitByadmin', {
    title: 'Profilepage',
    data: userData,
    dataAdmin: adminData,
    people: alluserData,
    userScore: netScore,
  });
};
//render homepage
module.exports.home = function (req, res) {
  return res.render('home', {
    title: 'Homepage',
  });
};
//register page
module.exports.register = function (req, res) {
  return res.render('register', {
    title: 'RegisterPage',
  });
};
//login page
module.exports.login = function (req, res) {
  return res.render('login', {
    title: 'Loginpage',
  });
};
//sign-in user creation
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  try {
    let userInfo = await User.create(req.body);
    console.log('userinfo is here:', userInfo);
    return res.redirect('/login');
  } catch (error) {
    console.log(error.message);
  }
};
//profile page
module.exports.profile = async function (req, res) {
  let loggeduserEmail = req.session.useremail;
  let userData = await User.find({ email: loggeduserEmail });
  let alluserData = await User.find({});
  console.log('profile userdata : ', userData);
  console.log('profile alluserdata : ', alluserData);
  console.log('profile userdata role : ', userData[0].role);
  if (userData[0].role == 'Employee') {
    return res.render('profile_emp', {
      title: 'Profilepage',
      data: userData,
    });
  } else {
    return res.render('profile_admin', {
      title: 'Profilepage',
      data: userData,
      people: alluserData,
    });
  }
};
//logout
module.exports.destroySession = function (req, res) {
  res.clearCookie('crm_bingo');
  return res.redirect('/');
};
//login
module.exports.signIn = async function (req, res) {
  try {
    const userEmail = req.body.email;
    const userPwd = req.body.password;

    let userData = await User.find({ email: userEmail });
    if (userData) {
      console.log('userData is here: ', userData);
      if (userData[0].password == userPwd) {
        req.session.useremail = userEmail;
        return res.redirect('/profile');
      } else {
        return res.redirect('/login');
      }
    } else {
      return res.redirect('/register');
    }
  } catch (error) {
    console.log(error.message);
  }
};
