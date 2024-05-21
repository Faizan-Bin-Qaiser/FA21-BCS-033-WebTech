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
        if (username === "admin" && password === "password123") {
            req.session.user = { id: 1, username: "admin" };
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
