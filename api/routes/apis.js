const express = require("express");
const inside = require("point-in-polygon");
const router = express.Router();
const Area = require("../../models/area");
const Form = require("../../models/form");
const User = require("../../models/user");
const Information = require("../../models/Information");
const mongoose = require("mongoose");

router.put("/adduser", (req, res, next) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    type: req.body.type
  });

  user
    .save()
    .then(resolve => {
      console.log("ADDING USER RESOLVED ==>", resolve);
      res.status(200).json({
        message: "user added successfully.",
        user
      });
    })
    .catch(err => {
      console.log("ADDING USER ERRORED ==>", err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/users/:username", (req, res, next) => {
  let username = req.params.username;
  console.log("$$$$$$ username = ", username);
  User.findOne({
    username: username
  })
    .exec()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json(resolve);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/addform", (req, res, next) => {
  const form = new Form({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    fields: req.body.fields
  });
  console.log("JJJJJJJ", req.body.fields);
  form
    .save()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json({
        message: "FORM added successfully.",
        form
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/forms/:fid", (req, res, next) => {
  let id = req.params.fid;
  Form.findById(id)
    .exec()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json(resolve);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/forms", (req, res, next) => {
  Form.find()
    .exec()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json(resolve);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/forms/send", (req, res, next) => {
  const values = req.body;
  const info = new Information({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    formName: req.body.formName,
    fields: req.body
  });

  info
    .save()
    .then(resolve => {
      console.log("ADDING information RESOLVED ==>", resolve);
      res.status(200).json({
        message: "information added successfully.",
        info
      });
    })
    .catch(err => {
      console.log("ADDING information ERRORED ==>", err);
      res.status(500).json({
        error: err
      });
    });

  console.log("send api called. values : ", values);
});

router.get("/forms/info/:formName", (req, res, next) => {
  let formName = req.params.formName;
  Information.find({
    formName: formName
  })
    .exec()
    .then(resolve => {
      console.log(resolve);

      res.status(200).json({
        message: "finding information successful",
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/addArea", (req, res, next) => {
  const gis = new Area({
    _id: mongoose.Types.ObjectId(),
    areaType: req.body.areaType,
    properties: req.body.properties,
    geometry: req.body.geometry
  });

  gis
    .save()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json({
        message: "GIS added successfully.",
        gis
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/testpoint/:lat/:long", (req, res, next) => {
  let lat = req.params.lat;
  let long = req.params.long;
  let areas = [];
  Area.find()
    .exec()
    .then(resolve => {
      console.log(resolve);
      resolve.map((item, i) => {
        let area = item.geometry.coordinates[0];
        if (inside([long, lat], area)) {
          areas.push(item.properties.name);
        }
      });
      res.status(200).json({
        message: "successful",
        foundAreas: areas,
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/areas", (req, res, next) => {
  Area.find()
    .exec()
    .then(resolve => {
      res.status(200).json({
        message: "All the areas was returned successfully",
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/forms/:fid", (req, res, next) => {
  let id = req.params.fid;
  Form.remove({ _id: id })
    .exec()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json({
        message: 'form deleted successfully.',
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/forms/:fid", (req, res, next) => {
  let id = req.params.fid;
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Form.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(resolve => {
      console.log(resolve);
      res.status(200).json({
        message: 'form updated successfully.',
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/areas/:aid", (req, res, next) => {
  let id = req.params.aid
  Area.remove({ _id: id })
    .exec()
    .then(resolve => {
      res.status(200).json({
        message: "Area was deleted successfully",
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/areas/:aid", (req, res, next) => {
  let id = req.params.aid
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Area.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(resolve => {
      res.status(200).json({
        message: "Area was updated successfully",
        resolve
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;