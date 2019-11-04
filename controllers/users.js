const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next) {
        userModel.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, function(err, result) {
                if( err) {
                    next(err);
                } else {
                    res.status(201).json({
                        'message': 'success',
                        'data' : null
                    });
                }
            }
        );
    },

    authenticate: function(req, res, next) {
        userModel.findOne(
            {
                email: req.body.email
            },
            function(err, userInfo) {
                if( err ) {
                    next(err);
                } else {
                    if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'),
                        { expiresIn: '3h'});

                        res.status(200)
                            .json({
                                'message' : 'success',
                                'data' : {
                                    'token' : token,
                                    'user' : userInfo
                                }
                            });
                    } else {
                        res.json({
                            'message' : 'Invalid email or password',
                            'data': null
                        });
                    }
                }
            }
        )
    }
}