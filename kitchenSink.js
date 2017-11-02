let request = require('request');

module.exports.getDescrips = (req, res, next) => {
    for(let i=0; i<10; i++){
        const { Pose, Pose_Description } = req.app.get("models");
        Pose.findOne({where: {id: i}
        }).then(pose => {
        let poseId = pose.dataValues.id
        let rep = /\-/gi
        //might need to add a string method to shorten the query? All of them are coming back negative except the downdog
        let searchTerm = pose.dataValues.slug.replace(rep,'%20');
        console.log("poseID??", poseId);
        console.log("and now... search term>>>", searchTerm);
        request.get(`http://api.wolframalpha.com/v2/query?appid=A9HAKK-J9Y3EQXYPA&output=json&input=${searchTerm}`, (err, res, body) => {
            let parsed = JSON.parse(body);
            console.log('parsed', parsed);
            if(parsed.queryresult.pods) {

                console.log('instructions', parsed.queryresult.pods[3].subpods[0].plaintext);
                console.log('benefits', parsed.queryresult.pods[9].subpods[0].plaintext);
                Pose_Description.create({
                    pose_id: poseId,
                    instructions: parsed.queryresult.pods[3].subpods[0].plaintext,
                    benefits: parsed.queryresult.pods[9].subpods[0].plaintext
                })
            }
            })
        });
    }
};