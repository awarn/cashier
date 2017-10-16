import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import App from "./components/App"
import history from "./services/History"

import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux"
//import reducers from "./reducers"

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  applyMiddleware(middleware)
)

ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>
), document.getElementById("root"))

if(process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept()
}
