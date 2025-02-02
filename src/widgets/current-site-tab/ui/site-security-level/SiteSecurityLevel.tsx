import { useQuery } from '@tanstack/react-query';
import {
  CircleAlert,
  LoaderCircle,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';
import { JSX, ReactNode } from 'react';
import { SecurityLevels } from 'src/entities/domain/detection/Detection.entity';
import { DetectionService } from 'src/entities/domain/detection/Detection.service';

const SecurityLevelsVariants: Record<
  SecurityLevels,
  { icon: ReactNode; text: string }
> = {
  [SecurityLevels.CLEAR]: {
    icon: <ShieldCheck size={30} color={'#064e3b'} />,
    text: 'Данный сайт безопасен',
  },
  [SecurityLevels.DANGER]: {
    icon: <CircleAlert size={30} color={'#831843'} />,
    text: 'Это опасный сайт',
  },
  [SecurityLevels.WARNING]: {
    icon: <TriangleAlert size={30} color={'#eab308'} />,
    text: 'Будьте осторожны, сайт небезопасен',
  },
};

type SiteSecurityLevelProps = {
  url: string;
};

export const SiteSecurityLevel = ({
  url,
}: SiteSecurityLevelProps): JSX.Element => {
  const {
    data: detection,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['detection', url],
    queryFn: () => DetectionService.getDetection(url),
  });

  if (!detection || isLoading || isFetching) {
    return (
      <div className="flex gap-4 items-center justify-start">
        <LoaderCircle className="animate-spin" />
        <p className="text-base font-medium text-left">Загрузка...</p>
      </div>
    );
  }

  const { text, icon } = SecurityLevelsVariants[detection.securityLevel];

  return (
    <div className="flex gap-4 items-center justify-start">
      {icon}
      <p className="text-base font-medium text-left">{text}</p>
    </div>
  );
};
