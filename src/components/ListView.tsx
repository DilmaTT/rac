import { useMemo } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { format, differenceInSeconds, isWithinInterval, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
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
  const { sessions, settings } = useStorage();
  const { listViewOptions } = settings;

  const filteredSessions = useMemo(() => {
    const now = new Date();
    let interval;

    switch (listViewOptions.dateRangeMode) {
      case 'week':
        interval = { start: startOfWeek(now, { locale: ru }), end: endOfWeek(now, { locale: ru }) };
        break;
      case 'month':
        interval = { start: startOfMonth(now), end: endOfMonth(now) };
        break;
      case 'custom':
        interval = { start: subDays(now, listViewOptions.customDateRangeDays), end: now };
        break;
      default: // 'all' time
        return sessions;
    }

    return sessions.filter(session => isWithinInterval(new Date(session.overallStartTime), interval));
  }, [sessions, listViewOptions.dateRangeMode, listViewOptions.customDateRangeDays]);


  const processedSessions = useMemo(() => {
    return filteredSessions
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

        const playDurationInHours = playDuration / 3600;
        const handsPerHour = playDurationInHours > 0 ? Math.round(session.handsPlayed / playDurationInHours) : 0;

        const dateFormatParts: string[] = [];
        if (listViewOptions.showDayOfWeek) dateFormatParts.push('EEEE');
        dateFormatParts.push('d');
        if (listViewOptions.showMonth) dateFormatParts.push('MMMM');
        dateFormatParts.push('yyyy');
        const dateFormat = dateFormatParts.join(' ');

        return {
          id: session.id,
          date: format(overallStart, dateFormat, { locale: ru }),
          startTime: format(overallStart, 'p', { locale: ru }),
          endTime: format(overallEnd, 'p', { locale: ru }),
          totalDuration: formatSeconds(totalDuration),
          playDuration: formatSeconds(playDuration),
          selectDuration: formatSeconds(selectDuration),
          handsPlayed: session.handsPlayed,
          handsPerHour,
          sessionCount: session.periods.length,
        };
      })
      .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
  }, [filteredSessions, listViewOptions.showMonth, listViewOptions.showDayOfWeek]);

  if (processedSessions.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8 py-16 border-2 border-dashed rounded-lg">
        <p className="text-lg font-medium">Нет сессий за выбранный период</p>
        <p className="text-sm">Измените фильтр или начните новую сессию.</p>
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg">
      <Table>
        <TableCaption>Список ваших недавних покерных сессий.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Дата</TableHead>
            {listViewOptions.showStartTime && <TableHead>Начало</TableHead>}
            {listViewOptions.showEndTime && <TableHead>Конец</TableHead>}
            {listViewOptions.showSessionCount && <TableHead className="text-right">Периоды</TableHead>}
            {listViewOptions.showDuration && <TableHead className="text-right">Общее время</TableHead>}
            {listViewOptions.showTotalPlayTime && <TableHead className="text-right">Время игры</TableHead>}
            <TableHead className="text-right">Время селекта</TableHead>
            {settings.showHandsPlayed && <TableHead className="text-right">Руки</TableHead>}
            {listViewOptions.showHandsPerHour && <TableHead className="text-right">Рук/час</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.date}</TableCell>
              {listViewOptions.showStartTime && <TableCell className="tabular-nums">{session.startTime}</TableCell>}
              {listViewOptions.showEndTime && <TableCell className="tabular-nums">{session.endTime}</TableCell>}
              {listViewOptions.showSessionCount && <TableCell className="text-right tabular-nums">{session.sessionCount}</TableCell>}
              {listViewOptions.showDuration && <TableCell className="text-right tabular-nums">{session.totalDuration}</TableCell>}
              {listViewOptions.showTotalPlayTime && <TableCell className="text-right tabular-nums">{session.playDuration}</TableCell>}
              <TableCell className="text-right tabular-nums">{session.selectDuration}</TableCell>
              {settings.showHandsPlayed && <TableCell className="text-right tabular-nums">{session.handsPlayed}</TableCell>}
              {listViewOptions.showHandsPerHour && <TableCell className="text-right tabular-nums">{session.handsPerHour}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListView;
