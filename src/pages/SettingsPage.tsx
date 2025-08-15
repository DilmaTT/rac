import { useStorage } from '@/hooks/useStorage';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

const SettingsPage = () => {
  const { settings, updateSettings } = useStorage();

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Настройки</h1>
      <div className="space-y-8">
        <div className="p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Внешний вид</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="text-base">
              Тема
            </Label>
            <Button onClick={toggleTheme} id="theme-toggle" variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Текущая тема: <span className="font-semibold capitalize">{settings.theme === 'dark' ? 'Тёмная' : 'Светлая'}</span>
          </p>
        </div>

        <div className="p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Вид главного экрана</h2>
          <RadioGroup
            value={settings.view}
            onValueChange={(value) => updateSettings({ view: value as 'list' | 'calendar' | 'custom' })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="list" id="view-list" />
              <Label htmlFor="view-list">Список</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="calendar" id="view-calendar" />
              <Label htmlFor="view-calendar">Календарь</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="view-custom" />
              <Label htmlFor="view-custom">Свой вариант</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Настройки сессии</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="split-periods" className="pr-4">Включить разделение на Селект/Игру</Label>
              <Switch
                id="split-periods"
                checked={settings.splitPeriods}
                onCheckedChange={(checked) => updateSettings({ splitPeriods: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-notes" className="pr-4">Показывать поле 'Заметки'</Label>
              <Switch
                id="show-notes"
                checked={settings.showNotes}
                onCheckedChange={(checked) => updateSettings({ showNotes: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-hands" className="pr-4">Показывать поле 'Количество рук'</Label>
              <Switch
                id="show-hands"
                checked={settings.showHandsPlayed}
                onCheckedChange={(checked) => updateSettings({ showHandsPlayed: checked })}
              />
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Планирование</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="monthly-hours">Часов в месяц</Label>
              <Input
                id="monthly-hours"
                type="number"
                value={settings.goals.hours}
                onChange={(e) => updateSettings({ goals: { ...settings.goals, hours: Number(e.target.value) || 0 } })}
                className="text-right"
                min="0"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="monthly-hands">Рук в месяц</Label>
              <Input
                id="monthly-hands"
                type="number"
                value={settings.goals.hands}
                onChange={(e) => updateSettings({ goals: { ...settings.goals, hands: Number(e.target.value) || 0 } })}
                className="text-right"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
