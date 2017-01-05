exports.index = function(req, res){
    res.render('Clock', { name: 'John' });
    //res.render('Clock');
};