import { Card, CardContent, CardHeader, CardTitle } from '@shared/lib/shadcn';
import { useQuery } from '@tanstack/react-query';
import { JSX } from 'react';
import { browserService } from 'src/entities/chrome';
import { SiteSecurityLevel } from 'src/widgets/current-site-tab/ui/site-security-level/SiteSecurityLevel';


export const SiteInfo = (): JSX.Element => {

	const { data: tabWindowInfo } = useQuery({
		queryKey: [ 'window-origin' ],
		queryFn: browserService.getActiveTabWindowInfo
	});

	return (
		<div className="p-3">
			<Card className="flex flex-col items-center">
				<CardHeader>
					<CardTitle className="flex justify-center">
						<p className="text-lg">
							{tabWindowInfo?.origin || 'http://моковый_ориджин'}
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent >
					<SiteSecurityLevel url={tabWindowInfo?.href || ''}/>
				</CardContent>
			</Card>
		</div>

	);
};
