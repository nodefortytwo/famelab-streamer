/*
 * GET home page.
 */

exports.index = function(req, res) {
    console.log(req.userCnt);
    if (req.userCnt > 1000){
        res.render('maxed', {
            title : 'Express',
            nowpath : '/nowjs/now.js'
        });
    }else{
        res.render('index', {
            title : 'Express',
            nowpath : '/nowjs/now.js'
        });
    }
};
