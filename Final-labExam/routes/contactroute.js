module.exports = (app, isAuthenticated) => {
    app.get('/contact', isAuthenticated, (req, res) => {
        res.render('contact'); // Render the contact page only if logged in
    });

    app.get('/login', (req, res) => {
        res.render('login'); // Render the login form
    });

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        // Assume you validate username and password here
        if (username === "Faizan Bin Qaiser" && password === "faizan123") {
            req.session.user = { id: 1, username: "Faizan Bin Qaiser" };
            res.redirect('/contact');
        } else {
            res.send("Invalid username or password");
        }
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/');
            }

            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    });
};
