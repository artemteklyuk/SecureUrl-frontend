import { Label, Switch, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/lib/shadcn';
import { JSX } from 'react';
import { ConfigurationFlags } from 'src/entities/domain/configuration';

type ConfigurationSwitchProps = {
	flag: ConfigurationFlags
	label: string
	isChecked: boolean
	toggle: (flag: ConfigurationFlags) => void
	helperText: string
}

export const ConfigurationSwitch = ({
	flag,
	label,
	isChecked,
	toggle,
	helperText
}: ConfigurationSwitchProps): JSX.Element => {
	return (
		<div className="w-full flex justify-between items-center">
			<TooltipProvider>
				<Tooltip delayDuration={300}>
					<TooltipContent side={'bottom'} sideOffset={7}>
						<p>{helperText}</p>
					</TooltipContent>
					<TooltipTrigger>
						<Label className="cursor-pointer" htmlFor={flag}>{label}</Label>
					</TooltipTrigger>
				</Tooltip>
			</TooltipProvider>
			<Switch
				onCheckedChange={() => toggle(flag)}
				checked={isChecked}
				id={flag}
			/>
		</div>
	);
};
