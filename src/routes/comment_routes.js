import express from 'express';
import passport from "passport";
import models from "./../db/models";
const tokenAuth = passport.authenticate("jwt", { session: false });
const router = express.Router();


// localhost: 3000/api/comments get all comments
// router.get('/api/post/:id/comments', (req, res) => {
//     // res.status(200).json({message: 'working'});
//        models.Comment.findAll({where: {post_id: req.params.id}}).then(comments => {
//        res.status(200).json({comments: comments});
//        }).catch(e => console.log(e));
//   })


// create new comment
router.post('/api/post/:id/comment', (req, res) => {
    models.Comment.create(
        {
            comment: req.body.comment,
            post_id: req.params.id
        }
    )
    .then(commentNewFromDB => {
    res.status(201).json({comment: commentNewFromDB});
    })
    .catch(e => console.log(e))
    
  });








  export default router;