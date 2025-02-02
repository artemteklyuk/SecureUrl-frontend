import { Button } from '@shared/lib/shadcn';
import { JSX } from 'react';
import { SecurityLevels } from 'src/entities/domain/detection/Detection.entity';

const SecurityLevelsMap = {
	[SecurityLevels.DANGER]: <span className="text-[#831843]">Опасно</span>,
	[SecurityLevels.WARNING]: <span className="text-[#eab308]">Небезопасно</span>
};

export const WarningPage = (): JSX.Element => {

	const threatInfo = new URLSearchParams(window.location.search);

	const securityLevel = threatInfo.get('securityLevel');
	const targetUrl = threatInfo.get('targetUrl');

	return (
		<div className="accent-background p-2 flex items-center justify-center flex-col gap-5">
			<div className="flex flex-col gap-3 justify-center items-center">
				<h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
					Веб-сайт заблокирован
				</h1>
				<div className="flex gap-2">
					<p className="scroll-m-20 text-xl font-semibold tracking-tight align-baseline">
						Статуc угрозы:
					</p>
					<span className="scroll-m-20 text-xl font-bold tracking-tight align-baseline italic">
						{SecurityLevelsMap[(securityLevel as SecurityLevels.WARNING | SecurityLevels.DANGER) || SecurityLevels.WARNING]}
					</span>

				</div>

			</div>
			<div className="flex flex-col gap-5">
				<p className="leading-7 text-center text-base">
					Страница <span className='italic'>{targetUrl}</span> заблокирована, так как может содержать <span className="font-bold">вредоносную
					активность.</span>
				</p>
				<p className="leading-7 text-center text-sm ">
					Настоятельно рекомендуем вам не продолжать, так как в результате посещения этого веб-сайта вы
					рискуете стать объектом кибер-атаки
				</p>
			</div>
			<div className="flex gap-5">
				<Button
					variant="destructive"
					onClick={() => {
						targetUrl && window.open(targetUrl);
						window.close();
					}}
				>
					Перейти
				</Button>
				{/*<Button>Вернуться</Button>*/}
			</div>
		</div>
	);
};
