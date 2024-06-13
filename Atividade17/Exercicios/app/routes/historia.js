module.exports = function(app){
    app.get('/historia', function(req,res){
        res.render("informacao/historia");
    });
}