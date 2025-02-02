import { Card, CardContent, CardHeader, CardTitle } from '@shared/lib/shadcn';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@shared/lib/shadcn/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { JSX } from 'react';
import 'dayjs/locale/ru.js';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Detection } from 'src/entities/domain/detection/Detection.entity';
import { DetectionRepository } from 'src/entities/domain/detection/Detection.repository';
import { DetectionService } from 'src/entities/domain/detection/Detection.service';


const chartConfig = {
	mobile: {
		label: 'Mobile',
		color: '#60a5fa',
	},
} satisfies ChartConfig;

var groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

const groupDetectionsByDate = (detections: Detection[]): { date: string, count: number }[] => {
	const formattedDateDetections = detections.map((detection) => {
		console.log(detection);
		console.log(dayjs(detection.detectedAt).locale('ru').format('mm'));

		return ({
			...detection,
			detectedAt: dayjs(detection.detectedAt).locale('ru').format('mm')
		});
	});
	console.log('formattedDateDetections', formattedDateDetections);
	const groupedData = groupBy(formattedDateDetections, 'detectedAt');
	console.log('groupedData', groupedData);
	return Object.entries(groupedData).map(([ key, value ]) => ({
		date: key,
		count: (value as object[]).length
	}));

};

export const Statistics = (): JSX.Element => {

	const { data: detections } = useQuery({ queryFn: DetectionService.getAllDetections, queryKey: [ 'detection' ] });
	if (!detections) {
		return <>Загрузка...</>;
	}

	const chartData = groupDetectionsByDate(detections);

	console.log('chartData', chartData);

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Угроз предотвращено
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
					<LineChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false}/>
						<XAxis
							dataKey="date"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip content={<ChartTooltipContent/>}/>
						<Line dataKey="count" fill="var(--color-desktop)"/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>

	);
};



