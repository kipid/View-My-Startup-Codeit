import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import CommonsPage from './pages/CommonsPage';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<CommonsPage/>}>
				<Route index element={<Home/>}/>
			</Route>
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	</BrowserRouter>
);
