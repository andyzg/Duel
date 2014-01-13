
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Duel ' });
};

exports.home = function(req, res){
	  res.render('index', { title: 'Duel ' });
};