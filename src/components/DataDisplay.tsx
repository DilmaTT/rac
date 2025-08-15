import { useStorage } from '@/hooks/useStorage';
import ListView from './ListView';
import CalendarView from './CalendarView';

const DataDisplay = () => {
  const { settings } = useStorage();

  const renderView = () => {
    switch (settings.view) {
      case 'list':
        return <ListView />;
      case 'calendar':
        return <CalendarView />;
      case 'custom':
        return <div className="text-center text-muted-foreground mt-8">Custom View (Not Implemented)</div>;
      default:
        return <ListView />;
    }
  };

  return (
    <div className="w-full">
      {renderView()}
    </div>
  );
};

export default DataDisplay;
