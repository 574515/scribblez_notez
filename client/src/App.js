import {
	createBrowserRouter,
	RouterProvider,
	Outlet
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import About from "./pages/About";
import "./style.scss";

const Layout = () => {
	return (
			<>
				<Navbar/>
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
				path: "/profile/:username",
				element: <Profile/>
			},
			{
				path: "/about",
				element: <About/>
			}
		]
	},
	{
		path: "/register",
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
