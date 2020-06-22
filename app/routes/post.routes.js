module.exports = (app) => {
  const posts = require("../controllers/post.controller");

  let router = require("express").Router();

  // Create a new post
  router.post("/", posts.create);

  // retrieve all post
  router.get("/", posts.findAll);

  // retrieve all published post
  router.get("/published", posts.findAllPublished);

  // retrieve single post
  router.get("/:id", posts.findOne);

  // Update post
  router.put("/:id", posts.update);

  // delete post
  router.delete("/:id", posts.delete);

  // delete all
  router.delete("/", posts.deleteAll);

  app.use("/api/posts", router);
};
