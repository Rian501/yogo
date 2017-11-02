let request = require('request');

module.exports.getDescrips = (req, res, next) => {
  const { Pose, Pose_Description } = req.app.get("models");
  // Pose.findAll({ limit: 4 })
  Pose.findOne({
  }).then(pose => {
    // console.log(pose);
    let poseId = pose.dataValues.id
    let rep = /\-/gi
    let searchTerm = pose.dataValues.slug.replace(rep,'%20');
    console.log("poseID??", poseId);
    console.log("and now... search term>>>", searchTerm);
    request.get(`http://api.wolframalpha.com/v2/query?appid=A9HAKK-J9Y3EQXYPA&output=json&input=${searchTerm}`, (err, res, body) => {
        let parsed = JSON.parse(body);
        console.log('parsed', parsed);
        console.log('instructions', parsed.queryresult.pods[3].subpods[0].plaintext);
        console.log('benefits', parsed.queryresult.pods[9].subpods[0].plaintext);
        Pose_Description.create({
            pose_id: poseId,
            instructions: parsed.queryresult.pods[3].subpods[0].plaintext,
            benefits: parsed.queryresult.pods[9].subpods[0].plaintext
        })
    })
  });
};