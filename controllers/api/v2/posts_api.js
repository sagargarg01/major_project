module.exports.index = function(req, res){
    return res.json(200, {
        message: 'lists of posts v2',
        posts: []
    })
}