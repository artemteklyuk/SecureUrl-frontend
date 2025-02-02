import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/lib/shadcn';
import { CurrentSite } from '@widgets/current-site-tab/ui/current-site/CurrentSite';
import { Statistics } from '@widgets/statisctics/ui/Statistics';
import { JSX } from 'react';

enum TabsValues {
	STATISTICS = 'Статистика',
	CURRENT_SITE = 'Текущий веб-сайт'
}

export const MainPage = (): JSX.Element => {
    return (
        <div className="w-full">
	        <Tabs defaultValue={TabsValues.CURRENT_SITE} className="w-full">
		        <TabsList className="grid w-full grid-cols-2">
			        <TabsTrigger value={TabsValues.CURRENT_SITE}>{TabsValues.CURRENT_SITE}</TabsTrigger>
			        <TabsTrigger value={TabsValues.STATISTICS}>{TabsValues.STATISTICS}</TabsTrigger>
		        </TabsList>
		        <TabsContent value={TabsValues.CURRENT_SITE}>
			        <CurrentSite/>
				</TabsContent>
		        <TabsContent value={TabsValues.STATISTICS}><Statistics/></TabsContent>
	        </Tabs>
        </div>
    );
};
