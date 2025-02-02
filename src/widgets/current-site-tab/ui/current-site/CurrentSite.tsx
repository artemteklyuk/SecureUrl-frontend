import { JSX } from 'react';
import { Configuration } from 'src/widgets/current-site-tab/ui/configuration/Configuration';
import { SiteInfo } from 'src/widgets/current-site-tab/ui/site-info/SiteInfo';

export const CurrentSite = (): JSX.Element => {

	return (
		<div className="grid grid-cols-[45%_55%]">
			<Configuration/>
			<SiteInfo/>
		</div>
	);
};
