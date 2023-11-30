const express = require('express');
const router = express.Router({mergeParams: true});
const cors = require('cors');
const { test, logoutUser, registerUser, loginUser, getProfile, addCategory, addTask, changeFilter, updateTaskStatus, deleteTask, deleteCategory } = require('../controllers/authController');
///const {protect } = require('../helpers/authMiddleware');

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://localhost:5173'
    })
) 

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