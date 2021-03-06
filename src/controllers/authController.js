const router = require('express').Router();
const authService = require('../services/authService');




router.get('/register', (req, res) => {
	res.render('auth/register');
});

router.post('/register', async (req, res) => {

	let createUser = await authService.register(req.body);
	console.log(createUser);

	if (createUser) {
		res.redirect('/login')
	} else {
		res.redirect('/404')
	}
});

router.get('/login', (req, res) => {
	res.render('auth/login')
});

router.post('/login', async (req, res) => {
	const token = await authService.login(req.body);

	if (!token) {
		return res.redirect('/404')
	}
	res.cookie('user', token , {httpOnly: true});
	res.redirect('/');
});

router.get('/logout',(req,res)=>{
	res.clearCookie('user');
	res.redirect('/');
})





module.exports = router;