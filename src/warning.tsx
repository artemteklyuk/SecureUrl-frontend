import { WarningPage } from '@app/ui/WarningPage';
import ReactDOM from 'react-dom/client';
import 'src/index.css';
const rootEl = document.getElementById('root');
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
			<WarningPage/>
	);
}
