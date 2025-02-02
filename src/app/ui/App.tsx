import { useNavigationStore } from 'src/entities/navigation';
import { Routes } from '../lib/routes';


export const App = () => {

	const currentPage = useNavigationStore(({ currentPage }) => currentPage);
	return (
		<div className="p-2 dark">
			{Routes[currentPage]}
		</div>
	);
};

