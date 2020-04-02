    const Comment = require('../models/comment');
    const Post = require('../models/post');


    module.exports.create = async function(req, res){

        try{

            let post = await Post.findById(req.body.post);

            if(post){
             let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
    
                post.comments.push(comment);
                post.save(); 
    
                req.flash('success', 'comment created Successfully');
                res.redirect('back');
            }
        }catch(err){
            req.flash('error', err);
            return;
        }

    }

    module.exports.destroy = async function(req, res){
        
        try{

        let comment = await Comment.findById(req.params.id);
       
        let post = await Post.findById(comment.post);

        if(comment.user == req.user.id  || req.user.id == post.user){
                    
            let postId = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId ,{ $pull:
            {comments: req.params.id} });

            req.flash('sucess','comment deleted successfully');
            return res.redirect('back');
        }else{
            req.flash('error','Not Authorized to delete');
            return res.redirect('back');
        }
        

        }catch(err){
           req.flash('error', err);
           return res.redirect('back');
        }

    }
