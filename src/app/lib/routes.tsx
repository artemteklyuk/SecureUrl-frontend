import { MainPage } from '@pages/main';
import { Pages } from 'src/entities/navigation';

export const Routes = {
	[Pages.MAIN]: <MainPage/>,
	[Pages.SETTINGS]: <div>Страница настроек</div>
}