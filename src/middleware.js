import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
/* import { Provider } from "react-redux";
import { createStore } from "redux"; */
// import reducers from "./reducers";

export default (req, res) => {
	if(process.env.NODE_ENV === "production") {
		const App = require("./components/App").default
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>Cashier</title>
					<!--<link rel="stylesheet" href="bundle.css">-->
				</head>
				<body>
					<div id="root">${renderToString(
						<StaticRouter location={req.url} context={{}}>
							<App />
						</StaticRouter>
					)}</div>
					<script src="bundle.js"></script>
				</body>
			</html>
		`);
	} else {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>Cashier</title>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
				</head>
				<body>
					<div id="root"></div>
					<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
					<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
					<script src="bundle.js"></script>
				</body>
			</html>
		`);
	}
};
/* ${renderToString(
	<Provider store={createStore(reducers)}>
		<StaticRouter location={req.url} context={{}}>
			<App />
		</StaticRouter>
	</Provider>
)} */