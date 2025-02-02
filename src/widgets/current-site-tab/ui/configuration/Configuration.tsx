import { JSX, useEffect } from 'react';
import { syncWithChromeStorage, useConfigurationStore } from 'src/entities/configuration';
import { ConfigurationFlags } from 'src/entities/domain/configuration';
import { ConfigurationSwitch } from 'src/widgets/current-site-tab/ui/configuration-switch/ConfigurationSwitch';
import { useShallow } from 'zustand/react/shallow';


export const Configuration = (): JSX.Element => {
	const [
		malware,
		scams,
		gLTDDomains,
		showBlocksCounter,
		toggleConfig
	] = useConfigurationStore(useShallow(({
		malware,
		scams,
		gLTDDomains,
		showBlocksCounter,
		toggleConfig
	}) => [
		malware,
		scams,
		gLTDDomains,
		showBlocksCounter,
		toggleConfig
	]));

	useEffect(() => {
		syncWithChromeStorage();
	}, []);

	return (
		<div className="flex gap-4 flex-col p-3">
			<p className="scroll-m-20 text-l font-semibold tracking-tight whitespace-nowrap">Защита для текущего
				веб-сайта</p>
			<div className="flex gap-3 flex-col">
				<ConfigurationSwitch
					toggle={toggleConfig}
					isChecked={malware}
					label={'Malware'}
					flag={ConfigurationFlags.MALWARE}
					helperText={'Блокирует вредоносные программы и вредоносный код'}
				/>
				<ConfigurationSwitch
					toggle={toggleConfig}
					isChecked={scams}
					label={'Scams'}
					flag={ConfigurationFlags.SCAMS}
					helperText={'Нейтрализует атаки онлайн мошенников, в том числе действия злоумышленников'}
				/>
				<ConfigurationSwitch
					toggle={toggleConfig}
					isChecked={gLTDDomains}
					label={'gLTD domains'}
					flag={ConfigurationFlags.G_LTD_DOMAINS}
					helperText={'Блокирует подозрительные домены верхнего уровня'}
				/>
				{/*<ConfigurationSwitch*/}
				{/*	toggle={toggleConfig}*/}
				{/*	isChecked={showBlocksCounter}*/}
				{/*	label={'Показать счетчик блокировок'}*/}
				{/*	flag={ConfigurationFlags.SHOW_BLOCKS_COUNTER}*/}
				{/*	helperText={'Включить счетчик блокировок на значке расширения'}*/}
				{/*/>*/}
			</div>
		</div>
	);
};
