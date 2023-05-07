import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./style.scss";
import Explore from "./pages/Explore";

const Layout = () => {
	return (
			<>
				<Navigation/>
				<Outlet/>
				<Footer/>
			</>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout/>,
		children: [
			{
				path: "/",
				element: <Home/>
			},
			{
				path: "/explore",
				element: <Explore/>
			}
		]
	},
	{
		path: "/signup",
		element: <Signup/>
	},
	{
		path: "/login",
		element: <Login/>
	}
]);

function App() {
	return (
			<div className="app">
				<div className="container">
					<RouterProvider router={router}/>
				</div>
			</div>
	);
}

export default App;
