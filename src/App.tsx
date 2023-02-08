import ThemeSwitcher from "./components/ThemeSwitcher";
import useGetData from "./hooks/useGetData";

function App() {
	const { data, error } = useGetData("keyboard");
	console.log(data);
	return (
		<div className='App h-screen bg:white dark:bg-gray-800 text-black dark:text-white'>
			<h1 className=' text-5xl text-red-400'>shiva</h1>
			<ThemeSwitcher />
		</div>
	);
}

export default App;
