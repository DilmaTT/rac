import { useMemo } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { format, differenceInSeconds } from 'date-fns';
import { formatSeconds } from '@/lib/utils';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

const ListView = () => {
  const { sessions } = useStorage();

  const processedSessions = useMemo(() => {
    return sessions
      .map(session => {
        const overallStart = new Date(session.overallStartTime);
        const overallEnd = new Date(session.overallEndTime);
        const totalDuration = differenceInSeconds(overallEnd, overallStart);

        let playDuration = 0;
        let selectDuration = 0;

        session.periods.forEach(period => {
          const periodStart = new Date(period.startTime);
          const periodEnd = new Date(period.endTime);
          const duration = differenceInSeconds(periodEnd, periodStart);
          if (period.type === 'play') {
            playDuration += duration;
          } else {
            selectDuration += duration;
          }
        });

        return {
          id: session.id,
          date: format(overallStart, 'PPP'),
          totalDuration: formatSeconds(totalDuration),
          playDuration: formatSeconds(playDuration),
          selectDuration: formatSeconds(selectDuration),
        };
      })
      .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
  }, [sessions]);

  if (sessions.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8 py-16 border-2 border-dashed rounded-lg">
        <p className="text-lg font-medium">История сессий пуста</p>
        <p className="text-sm">Начните новую сессию, чтобы увидеть здесь данные.</p>
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg">
      <Table>
        <TableCaption>Список ваших недавних покерных сессий.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Дата</TableHead>
            <TableHead className="text-right">Общее время</TableHead>
            <TableHead className="text-right">Время игры</TableHead>
            <TableHead className="text-right">Время селекта</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.date}</TableCell>
              <TableCell className="text-right tabular-nums">{session.totalDuration}</TableCell>
              <TableCell className="text-right tabular-nums">{session.playDuration}</TableCell>
              <TableCell className="text-right tabular-nums">{session.selectDuration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListView;
