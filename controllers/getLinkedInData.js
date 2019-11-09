var express = require("express"),
  router = express.Router(),
  MongoClient = require("mongodb").MongoClient,
  assert = require("assert"),
  url = "mongodb://localhost:27017/testDB";
const superagent = require("superagent");
const { parse } = require("querystring");
const CLIENT_ID = "811grlmasbvv75";
const REDIRECT_URI = "https://realevents.herokuapp.com";
// const REDIRECT_URI = "http://localhost:8080";
const SCOPE = "r_liteprofile,w_member_social,r_emailaddress";
const CLIENT_SECRET = "tylHEQKHUDgCf2hQ";
const GRANT_TYPE = "authorization_code";

var userData = require("../models/userData");
const fields = `id,first-name,last-name,email-address,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer`;

router.post("/", function(req, res) {
  // let params = {
  //   grant_type: GRANT_TYPE,
  //   code: req.body.token,
  //   redirect_uri: REDIRECT_URI,
  //   client_id: CLIENT_ID,
  //   client_secret: CLIENT_SECRET
  // };
  // let formBody = [];
  // for (let property in params) {
  //   let encodedKey = encodeURIComponent(property);
  //   let encodedValue = encodeURIComponent(params[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");
  // var query = Object.keys(params)
  //   .map(k => k + "=" + encodeURIComponent(params[k]))
  //   .join("&");
  console.log(req.body.token);
  superagent
    .post("https://www.linkedin.com/oauth/v2/accessToken")
    .type("form")
    .send({ grant_type: GRANT_TYPE })
    .send({ code: req.body.token })
    .send({ redirect_uri: REDIRECT_URI })
    .send({ client_id: CLIENT_ID })
    .send({ client_secret: CLIENT_SECRET })
    .then(
      function(data) {
        return data.body.access_token;
      },
      function(err) {
        console.log(err);
      }
    )
    .then(function(token) {
      superagent
        .get("https://api.linkedin.com/v2/me")
        .set("Authorization", "Bearer " + token)
        .end((err, resp) => {
          userData.getUserDataById(resp.body.id, function(err, userData) {
            console.log(userData);
            if (userData != null && userData != undefined) {
              res.send(userData);
            } else {
              res.send(resp.body);
            }
          });
        });
    });
});

module.exports = router;
