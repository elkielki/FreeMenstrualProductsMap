const User = require('./Models/User');
const Station = require('./Models/Station');
const { hashPassword, comparePassword} = require('./auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    return res.status(200).send('Hello');
}

const testPost = (req, res) => {
      const name = req.body.name;
      return res.json({name: name});
}

const registerUser = async (req, res) => {
    try {
       const {email, password, accessCode} = req.body;
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required to be at least 6 characters long'
            })
        }
        else if (!email) {
            return res.json({
                error: 'Email is required.'
            })
        } else if (accessCode != 'cake') {
            return res.json({
                error: 'Access code is invalid.'
            })
        };
        // check email
        const exist = await User.findOne({email})
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            email: email, 
            password: hashedPassword,
        })
    } catch (error) {
        console.log(error);
    }
};

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            const accessToken = jwt.sign(
                {
                    email: user.email, 
                    id: user._id, 
                }, 
                process.env.JWT_SECRET, 
                {
                    expiresIn: '30min'
                }
            )
            const refreshToken = jwt.sign(
                {
                    email: user.email, 
                    id: user._id, 
                }, 
                process.env.JWT_REFRESH_SECRET, 
                {
                    expiresIn: '3d'
                }
            )   
            
            res.cookie('accessToken', accessToken, {
                sameSite: 'none', 
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json(user) 
            res.cookie('refreshToken', refreshToken, {
                sameSite: 'none', 
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json(user)   
        } 
        else {
            res.json({
                error: "Passwords do not match"
            })
        }
    } catch(error) {
        console.log(error)
    }  
};

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
}

const getProfile = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.json({valid: false, message: "No refresh token"})
        } else {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
                if (err) {
                    return res.json({valid: false, message: "Invalid Refresh Token"})
                } else {
                    const accessToken = jwt.sign({
                        email: user.email, 
                        id: user._id, 
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '3d'
                    })
                    res.cookie('accessToken', accessToken, {maxAge: 60000})
                }
            })
        }
    } else {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => { 
            if (err) {
                return res.json({valid: false, message: "Invalid Token"})
            } else {
                res.json(user)
            }
        })
    }
}

const getStationList = async (req, res) => {
    const station = await Station.find();
    if (!station) {
        return res.json({
            error: 'No user found'
        })
    }
    else {
        return res.json(station);
    }
}

const addNewStation = async (req, res) => {
    try {
        const {name, pads, tampons, other, lat, long} = req.body;
        if (name == '') {
            return res.json({
                error: 'Name is empty.'
            })
        }
        const exist = await Station.findOne({name});
        if (exist) {
            return res.json({
                error: 'Name is taken already'
            })
        }
        const newStation = await Station.create({
            name: name,
            padQuantity: pads,
            tamponQuantity: tampons,
            otherQuantity: other,
            location: { 
                type: 'Point', 
                coordinates: [long, lat] 
            }
        })
        return res.json(newStation);
    } catch (error) {
        console.log(error);
    }
}

const editStation = async (req, res) => {
    try {
        const {name, pads, tampons, other} = req.body;
        const update = await Station.findOneAndUpdate(
            {name: name},
            {
                padQuantity: pads,
                tamponQuantity: tampons,
                otherQuantity: other,
            },
            {new: true}
        )
        return res.json(update);
    } catch (error) {
        console.log(error);
    }
}

const deleteStation = async (req, res) => {
    try {
        const {name} = req.body;
        const update = await Station.deleteOne({name: name})
        return res.json(update);
    } catch (error) {
        console.log(error);
    }
}

const sortDistance = async (req, res) => {
    try {
        const update = await Station.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.query.long, req.query.lat],
                    },
                },
            },
        })
        return res.json(update);
    } catch (error) {
        console.log(error);
    }
}

const sortAlphabetical = async (req, res) => {
    try {
        const update = await Station.find().collation({locale:'en',strength: 2}).sort({name:1})
        return res.json(update);
    } catch (error) {
        console.log(error);
    }
}

const getSearch = async (req, res) => {
    try {
        const update = await Station.find({name: { $regex: req.query.searchInput, $options: "i" }})
        return res.json(update);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
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
}