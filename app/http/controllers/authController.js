const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController(){
    return{
        login(req,res){
            res.render("auth/login");
        },

        postLogin(req,res,next){
          const {email,password} = req.body
          // Validate request
          if (!email || !password) {
            req.flash('error', 'All fields are required');
            return res.redirect('/login');
          }
            passport.authenticate('local', (err, user, info) => {
              if(err){
                req.flash('error', info.message)
                return next(err)
              }
              if(!user){
                req.flash('error', info.message)
                return res.redirect('/login')
              }

              //if the above two conditions are not met
              req.logIn(user, ()=>{
                if(err){
                  req.flash('error', info.message)
                  return next(err)
                }
                return res.redirect('/')
              })
            })(req,res,next)
        },

        register(req,res){
            res.render("auth/register");
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
          
            // Validate request
            if (!name || !email || !password) {
              req.flash('error', 'All fields are required');
              req.flash('name', name);
              req.flash('email', email);
              return res.redirect('/register');
            }
          
            // Check if email already exists
            try {
              const userExists = await User.exists({ email });
          
              if (userExists) {
                req.flash('error', 'Email already taken');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
              }
          
              // Hash the password
              const hashedPassword = await bcrypt.hash(password, 10);
          
              // If everything is fine, create a new user
              const user = new User({
                name,
                email,
                password: hashedPassword
              });
          
              await user.save();
          
              // Login just after register
              return res.redirect('/');
          
            } catch (err) {
              req.flash('error', 'Something went wrong');
              return res.redirect('/register');
            }
          },
          logout(req, res, next) {
            req.logout((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/login');
            });
        }
        }
}

module.exports = authController