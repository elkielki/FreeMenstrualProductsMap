const express = require('express');
const router = express.Router({mergeParams: true});
const cors = require('cors');
const { 
    test, 
    testPost, 
    logoutUser, 
    registerUser, 
    loginUser, 
    getProfile, 
    getStationList, 
    addNewStation, 
    editStation, 
    deleteStation, 
    sortDistance, 
    sortAlphabetical, 
    getSearch 
} = require('./authController');

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://localhost:5173'
    })
) 

/*
router.get('/test', test);
router.post('/testPost', testPost); 
*/
router.get('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.get('/getStations', getStationList);
router.post('/addNewStation', addNewStation);
router.put('/editStation', editStation);
router.put('/deleteStation', deleteStation);
router.get('/sortDistance', sortDistance);
router.get('/sortAlphabetical', sortAlphabetical);
router.get('/getSearch', getSearch);

module.exports = router