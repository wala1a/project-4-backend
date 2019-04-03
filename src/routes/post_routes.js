import express from 'express';
import passport from "passport";
import models from "./../db/models";
const tokenAuth = passport.authenticate("jwt", { session: false });
const router = express.Router();


// localhost: 3000/api/posts get all posts
router.get('/api/posts', (req, res) => {
    // res.status(200).json({message: 'working'});
       models.Post.findAll({ include: [{model: models.Comment}]}).then(posts => {
       res.status(200).json({posts: posts});
       }).catch(e => console.log(e));
  })
  
router.get('/api/post/:id', (req, res) => {
    //  res.status(200).json({message: 'working'});
      models.Post.findByPk(req.params.id).then(post => {
      res.status(200).json({post: post});
      }).catch(e => console.log(e));
  })

// create new post
router.post('/api/post', (req, res) => {
    models.Post.create(req.body)
    .then(postNewFromDB => {
    res.status(201).json({post: postNewFromDB});
    })
    .catch(e => console.log(e))
    
  });

// router.post('/api/post', tokenAuth, (req, res) => {
//   models.post.create({
//     body: req.body.body,
//     title: req.body.title,
//     user_id: req.user.id
//   })
//   .then(postNewFromDB => {
//     res.status(201).json({post: postNewFromDB});
//   })
//   .catch(e => console.log(e))
  
// });




  // delete existing post by record id
  router.delete('/api/post/:id', (req, res) => {
        models.Post.findByPk(req.params.id).then(post => {
        post.destroy().then(() => {
        res.status(200).json({
          result: `Record ID ${req.params.id} Deleted`,
        })
      })
      .catch(e => console.log(e)); 
    })
      .catch(e => console.log(e)); 
  });

// update an existing post
router.put('/api/post/:id', (req, res) => {
    // find post by id sent to us by user in the url
    models.Post.findByPk(req.params.id).then(post => {
      // call the update function on the post the database sent us back 
      // only update the fields i care about
      console.log(req.body)
      post.update({
          title: req.body.post.title,
          body: req.body.post.body
        }).then(post =>{
          // the database was able to update the user
          // and it sent us back an updated record with the new information
          // we can now sent back this new information to the user
          res.status(200).json({post: post});
        }).catch(e => console.log(e)); 
      }).catch(e => console.log(e)); 
  });

  export default router;