import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
	return (
		<div className="App">
			<GlobalStyle />
			<Navbar>
				<Input />
				<button>Today</button>
			</Navbar>
			<Today />
		</div>
	);
}

export default App;
