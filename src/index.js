const express = require('express');
const exphbs  = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;


// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.get("/", function (req, res) {
	res.render("home", {
    title: "Home"
	});
});

app.get("/yell", function (req, res) {
	res.render("yell", {
		title: "Yell",
		message: "hello world",
	});
});

app.get("/exclaim", function (req, res) {
	res.render("yell", {
		title: "Exclaim",
		message: "hello world",

		// This overrides _only_ the default `yell()` helper.
		helpers: {
			yell (msg) {
				return (msg + "!!!");
			},
		},
	});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})