import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";

function App() {
	return (
		<div className="App">
			<Navbar>
				<Input />
				<button>Today</button>
			</Navbar>
			<Today />
		</div>
	);
}

export default App;
