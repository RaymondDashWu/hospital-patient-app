// const Blog = require('../models/blog_model')
const Hospital = require('../models/hospital_model')

console.log("Connected to hospitals controller")
module.exports = function hospitals(app, Hospital) {
  app.get('/', (req, res) => {
    // the find() did not work in tutorial
    Hospital.create({})
      .then((hospital) => {
        res.render('index', {
          hospital_name: hospital.hospital_name
        })
      })
      .catch(err => {
        console.log(err.message)
      })
    //   Hospital.find({
    //       hospital_id: req.params.id
    //     })
    //     .then((err, model) => {
    //       if (err) throw err;
    //       res.render('index', {
    //         hospital_name: model.hospital_name
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err.message);
    // });
  });
}