const User = require('../Models/User');
const {TodoModel, TodoSchema} = require('../Models/Todo');
const { hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {
       const {email, password} = req.body;
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
            todos: [],
            filter: false,
            categories: ['Uncategorized'],
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
            const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
            res.cookie('token', token);
            //, categories: user.categories, filter: user.filter, todos: user.todos  
         /*   res.status(201).json({
                _id: user._id,
                email: user.email,
                token: jwt.sign({email: user.email, id: user._id, categories: user.categories, filter: user.filter, todos: user.todos }, process.env.JWT_SECRET, {expiresIn: '30d'})
            })  */
            /*    jwt.sign({email: user.email, id: user._id, categories: user.categories, filter: user.filter, todos: user.todos }, process.env.JWT_SECRET, {expiresIn: '30d'}, (err, token) => {
                    if (err) throw err;
                res.cookie('token', token, { sameSite: 'none', secure: true }).json(user)
            }) */ 
            console.log('logged in');
            return res.json({Status: "Success"});
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
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
            
        })
    } else {
        res.json(null)
    } 
};

// stuck on pending
// findoneandupdate not working 
// use dfferent command
const addCategory = async (req, res) => {
    User.findOneAndUpdate(
        {id: req.body.id}, 
        {$push: {
            categories: req.body.category
            }   
        },
        {new: true}
    )
    .then(result => {
        result.save()
        .then(saved => {
            res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    })
    .catch(err => res.status(422).json(err));
}

const addTask = async (req, res) => {
   // const { userEmail } = req.params.userEmail;
    User.findOneAndUpdate(
        {id: req.body.id}, 
        {$push: {
            todos: req.body.todos
            }   
        },
        {new: true}
    )
    .then(result => {
        result.save()
        .then(saved => {
            res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    })
    .catch(err => res.status(422).json(err));
}

const changeFilter = async (req, res) => {
    // const { userEmail } = req.params.userEmail;
    User.findOneAndUpdate(
         {id: req.body.id}, 
         {filter: req.body.filter},
         {new: true}
    )
    .then(result => {
        result.save()
        .then(saved => {
             res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    })
    .catch(err => res.status(422).json(err));
}

const updateTaskStatus = async (req, res) => {
    User.findOneAndUpdate(
        {'id': req.body.id},
        {
            'todos.$[i].status': req.body.status
        },
        { 'arrayFilters': [{ 'i._id': req.body.taskId}]},
        {new: true}
    ).then(result => {
        result.save()
        .then(saved => {
             res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    })
    .catch(err => res.status(422).json(err));
}

const deleteTask = async (req, res) => {
    User.findOneAndUpdate(
        {'id': req.body.id},
        {$pull: { todos: {_id: req.body.taskId}}},
        {new: true}
    ).then(result => {
        result.save()
        .then(saved => {
             res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    })
    .catch(err => res.status(422).json(err));
}
 
const deleteCategory = async (req, res) => {
    User.findOneAndUpdate(
        {'id': req.body.id},
        {
            $pull: { categories: req.body.category},
            'todos.$[i].category': 'Uncategorized',
        },
        { 'arrayFilters': [{ 'i.category': req.body.category}]},
        {new: true}
    ).then(result => {
        result.save()
        .then(saved => {
             res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    })
    .catch(err => res.status(422).json(err));
}

module.exports = {
    test,
    logoutUser,
    registerUser, 
    loginUser,
    getProfile,
    addCategory,
    addTask,
    changeFilter,
    updateTaskStatus,
    deleteTask,
    deleteCategory
}



     // const taskString = req.body.taskString;
    /*    const newTask = await TodoModel.create({
            task: req.body.taskString,
            status: "Not Started",
            category: "Uncategorized"
        })
        if (newTask) {
            return res.json({
                msg: "Task created."
            })
        } else {
            return res.json({
                error: 'An error has occurred while creating a new task.'
            })
        }   */
        /* 
                            "todos": {
                        "task": req.body.taskString,
                        "status": "Not Started",
                        "category": "Uncategorized" push
                    }


                    updateOne({email: 'elisekim2817@yahoo.com'}, 
            {
                $set: {
                    "filter": true,        
                }
                // categories: 
            }
        */
       /*    const todoUpdate = UserModel.findOneAndUpdate(
            {email: 'elisekim2817@yahoo.com'},
            {filter: true}
        )
        const todoSave = await todoUpdate.save();
        if (todoSave) {
            return res.json({
                msg: "Task was added to the todo list."
            })
        } else {
            return res.json({
                error: 'Error occurred while adding task to todo list.'
            })
        } */
       /* 
        if (todoUpdate) {
            return res.json({
                msg: "Task was added to the todo list."
            })
        } else {
            return res.json({
                error: 'Error occurred while adding task to todo list.'
            })
        }  */
/*    
                todos: [...req.body.todos, {
                    task: req.body.taskString,
                    status: "Not Started",
                    category: "Uncategorized"




    try {   
        const {id, todoCategory, taskString, todos} = req.body;
        const newTask = await TodoModel.create({
            task: taskString,
            status: 'Not Started',
            category: todoCategory,
        }) 
        if (!newTask) {
            return res.json({
                error: 'An error has occurred while creating a new task.'
            })
        }
        const todoUpdate = await UserModel.updateOne({_id: id}, 
            {
                todos: [...todos, newTask],
                category: todoCategory,
            }
        )
        if (!todoUpdate) {
            return res.json({
                error: 'An error has occurred while updating your todo list.'
            })
        }
    } catch(error) {
        console.log(error)
    }   */