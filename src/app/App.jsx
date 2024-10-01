import { Outlet } from 'react-router-dom';
import GNB from '../components/GNB';

function App() {
	return (
		<>
			<GNB />
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Outlet />
			</div>
		</>
	);
}

export default App;
