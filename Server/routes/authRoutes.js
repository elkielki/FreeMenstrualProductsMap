const express = require('express');
const router = express.Router({mergeParams: true});
const cors = require('cors');
const { test, logoutUser, registerUser, loginUser, getProfile, addCategory, addTask, changeFilter, updateTaskStatus, deleteTask, deleteCategory } = require('../controllers/authController');
///const {protect } = require('../helpers/authMiddleware');


/*const jwt = require('jsonwebtoken');

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}
*/

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://localhost:5173'
    })
) 
/*
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Error: "You are not authenticated"});
    } else {
        jwt.verify(token, "process.env.JWT_SECRET", (err, decoded) => {
            if (err) {
                return res.json({Error: "Token is invalid"});
            } else {
                req.email = decoded.email;
                req._id = decoded._id;
                req.categories = decoded.categories
                req.filter = decoded.filter;
                req.todos = decoded.todos;
                next();
            }
        })
    }
}  */

//test
router.get('/logout', logoutUser);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.put('/dashboard/newtask/:userEmail', addTask)
router.put('/dashboard/newcategory/:userEmail', addCategory)
router.put('/dashboard/updateFilter/:userEmail', changeFilter)
router.put('/updateStatus/:userEmail', updateTaskStatus)
router.put('/delete/:userEmail', deleteTask)
router.put('/deleteCategory/:userEmail', deleteCategory)




module.exports = router