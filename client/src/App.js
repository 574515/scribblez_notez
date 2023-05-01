import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home/>,
	},
	{
		path: "/register",
		element: <Register/>
	},
	{
		path: "/login",
		element: <Login/>
	}
]);

function App() {
	return (
			<RouterProvider router={router}/>
	);
}

export default App;
