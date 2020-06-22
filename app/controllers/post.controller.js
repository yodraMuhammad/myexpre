const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Create post
  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

// Retieve all
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occored while find post",
      });
    });
};

//find a Single
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retriving post with id=" + id,
      });
    });
};

// Update a Post with ID
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  }).then((result) => {
    if (result) {
      res.send({
        message: "Post was update susscesfully"
      })
    } else {
      res.send({
        message: `Cannot update Post with id=${id}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Error updating Post with id=${id}`
    })
  })
};

// Delete a post
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  }).then((result) => {
    if (result) {
      res.send({
        message: "Post was deleted succesfully"
      })
    } else {
      res.send({
        message: `cannot delete post with id=${id}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `COuld not delete post with id = ${id}`
    })
  })
};

// Delete a post
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  }).then((result) => {
    if (result) {
      res.send({
        message: `${result}Post was deleted succesfully`
      })
    } else {
      res.send({
        message: `cannot delete post`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: err.message || `Some error occured while removing allpost`
    })
  })
};

// Find all Published
exports.findAllPublished = (req, res) => {
  Post.findAll({
    where: { published: true }
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occored while retrieving posts"
      });
    });
};
