const express = require('express')
const router = express.Router();
const {
    check,
    validationResult
} = require("express-validator")
const gravatar = require("gravatar")
const jwt = require('jsonwebtoken');
let User = require('../schemas/User');
const bcryptjs = require('bcryptjs');
const config = require('config');
const authentication = require('../middleware/authentication');

router.get('/', authentication, async (req,res) => {  //znajdz tego konkretnego uzytkownika
    await console.log(req.user, 'log xd')
    try {
        await console.log(User, 'user')
        let user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).send('server error')
    }
})

router.get('/get_user_by_email/:user_email', async (req,res) => {

    try {
        let userEmail = req.params.user_email;
        let user = await User.findOne({email: userEmail}).select('-password')
        console.log(user)
        res.json(user);
    } catch (error) {
        console.error(error)
        return res.status(500).send('server error')
    }
});

router.get('/get_user_by_id/:user_id', async (req,res) => {
    try {
        let userId = req.params.user_id;
        let user = await User.findById(userId).select('-password')
        res.json(user);
    } catch (error) {
        console.error(error)
        return res.status(500).send('server error')
    }
})

router.get('/users', async (req,res) => {
    try {
        let users = await User.find().select('-password')
        await console.log(users)
        res.json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).send('server error')
    }
})

router.post('/register',
    [
        check('name', "Name is empty").not().isEmpty(),
        check('lastName', "lastname is empty").not().isEmpty(),
        check('userName', "userName is empty").not().isEmpty(),
        check('email', 'email is empty').isEmail(),
        check('password', 'password not is empty and 6 letters', ).isLength({
            min: 6,
            max: 12
        })
    ],

    async (req, res) => {
        try {
            let {
                name,
                lastName,
                userName,
                email,
                password
            } = req.body;
            let user = await User.findOne({
                email: email
            }).select('-password')

            let fetchUserName = await User.findOne({
                fetchUserName: userName
            }).select('-password')
            // let errors = validationResult(req);
            // if(!errors.isEmpty()){
            //     return res.status(400).json({errors: errors.array() })
            // }

            if (user) {
                res.send('taki email juz jest')
                return res.status(401).send("Taki email juz istnieje")
            }
            if (fetchUserName === userName) {
                return res.status(401).send("Taki username juz istnieje")
            }
            const avatar = gravatar.url(email, {
                r: "pg",
                d: "mm",
                s: "200"
            })
            let newUser = new User({
                name,
                lastName,
                userName,
                email,
                password,
                avatar
            })
            const salt = await bcryptjs.genSalt(10)
            let hashedPassword = await bcryptjs.hash(password, salt)
            newUser.password = hashedPassword;
            await newUser.save(); //zapis w bazie danych
            
            let payload = {
                user: {
                    id: newUser._id,
                }
            }
            jwt.sign(
                payload,
                config.get("jsonWebTokenSecret"), {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    })
                }
            )
        } catch (error) {
            // console.log(error)
            return res.status(500).send('Serwer error!!!!.')
        }
    });

   


    router.post('/login',
    [
        check('email', 'email is empty').isEmail(),
        check('password', 'password not is empty and 6 letters', ).isLength({
            min: 6,
            max: 12
        })
    ],
    async (req, res) => {
        try {
            let {email,password} = req.body;
            let user = await User.findOne({email: email})
            if (!user) {
                res.send('Nie ma taiego uzytkownika o takim e-mail')
                return res.status(404).send("Nie ma taiego uzytkownika2 o takim e-mail")
            }

            let doPasswordsMatch = await bcryptjs.compare(password, user.password)
          
            if(!doPasswordsMatch){
                return res.status(401).json("Hasło nie pasuje")
            }
            let payload = {
                user: {
                    id: user._id,
            }
            }
           
            jwt.sign(
                payload,
                config.get("jsonWebTokenSecret"), {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    })
                }
            )
        } catch (error) {
            console.error(error)
            return res.status(500).send('Serwer error login!!!!.')
        }
    });

    router.put('/search_by_username',
    [check('userNameFromSearch', "Search is empty").not().isEmpty()], 
    async (req, res) => {
        try {
            let {userNameFromSearch} = req.body;
            let users = await User.find().select('-password');
            let findUserByUserName = users.filter(user => user.userName.toString().toLowerCase().split(" ").join("") === 
            userNameFromSearch.toString().toLowerCase().split(" ").join(""));
            res.json(findUserByUserName);
        } catch (error) {
            console.error(error)
            return res.status(500).send('server error')
        }
    })


    router.put('/change_user_data/:user_data_to_change',
     authentication, 
     [
        check("changeUserData", "Input is empty").not().isEmpty()
    ], async (req,res) => {
        
        try {
            const { changeUserData } = req.body;
            console.log(changeUserData)
            console.log(req.params.user_data_to_change)
            const errors = validationResult(req);
            let user = await User.findById(req.user.id).select("-password");
        
            if (!errors.isEmpty())
              return res.status(400).json({ errors: errors.array() });
        
            if (!user) return res.status(404).json("User not found");
        
            //userDataToChange -> name,lastName,userName
        
            let userDataToChange = req.params.user_data_to_change.toString();
        
            if (user[userDataToChange] === changeUserData.toString())
              return res
                .status(401)
                .json("This is the same data that is already in database");
        
            user[userDataToChange] = changeUserData.toString();
        
            await user.save();
        
            res.json("Data is changed");
        } catch (error) {
            console.error(error)
            return res.status(500).send('Serwer error login!!!!.')
        }
    })

    router.put("/check_actual_password", authentication,  
    [check('passwordToCheck', 'Password has to be 6 letter and below 12').isLength({min:6,max:12})],
    // { to wyskoczy jesli sie ine bd zgadzac -6 +12
    //     "errors": [
    //         {
    //             "value": "mate",
    //             "msg": "Password has to be 6 letter and below 12",
    //             "param": "passwordToCheck",
    //             "location": "body"
    //         }
    //     ]
    // }

        async (req,res) => {
            try {
                const { passwordToCheck } = req.body;
                const errors = validationResult(req)
                if(!errors.isEmpty()) 
                return res.status(400).json({errors: errors.array()})
                let user = await User.findById(req.user.id);
                let doPasswordsMatch = await bcryptjs.compare( passwordToCheck, user.password);
                if(!doPasswordsMatch) return res.status(401).json("Passwords do not match")
                res.json("success")
            } catch (error) {
                console.error(error)
                return res.status(500).send('Serwer error login!!!!.')
            }
        }
    )

    router.put('/change_user_password', authentication, [check('newPassword', "New password should be 6 letter and below 12").isLength({min:6,max:12})],
        async (req,res) => {
            try {
                const { newPassword } = req.body;
                const errors = validationResult(req)
                if(!errors.isEmpty()) 
                return res.status(400).json({errors: errors.array()})
                let user = await User.findById(req.user.id)
                const salt = await bcryptjs.genSalt(10)
                const hashedPassword = await bcryptjs.hash(newPassword,salt)
                user.password = hashedPassword;
                await user.save();
                res.json('Success')
            } catch (error) {
                console.error(error)
                return res.status(500).send('Serwer error login!!!!.')
            }
        }
    )



module.exports = router;