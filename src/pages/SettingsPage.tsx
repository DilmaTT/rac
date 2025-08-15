import { useStorage } from '@/hooks/useStorage';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

const SettingsPage = () => {
  const { settings, updateSettings } = useStorage();

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <div className="space-y-8">
        <div className="p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Вид главного экрана</h2>
          <RadioGroup
            value={settings.view}
            onValueChange={(value) => updateSettings({ view: value as 'list' | 'calendar' })}
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
          </RadioGroup>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Настройки вида 'Список'</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Формат даты</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-month">Показывать месяц</Label>
                    <Switch
                      id="show-month"
                      checked={settings.listViewOptions.showMonth}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showMonth: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-day-of-week">Показывать день недели</Label>
                    <Switch
                      id="show-day-of-week"
                      checked={settings.listViewOptions.showDayOfWeek}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showDayOfWeek: checked } })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Период отображения</h3>
                <RadioGroup
                  value={settings.listViewOptions.dateRangeMode}
                  onValueChange={(value) => updateSettings({ listViewOptions: { ...settings.listViewOptions, dateRangeMode: value as 'all' | 'month' | 'week' | 'custom' } })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="date-range-month" />
                    <Label htmlFor="date-range-month">За месяц</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="date-range-week" />
                    <Label htmlFor="date-range-week">За неделю</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="date-range-custom" />
                    <Label htmlFor="date-range-custom">Свой вариант</Label>
                  </div>
                </RadioGroup>
                <div className="grid w-full items-center gap-1.5 mt-4">
                  <Label htmlFor="custom-date-range-days">Количество дней</Label>
                  <Input
                    type="number"
                    id="custom-date-range-days"
                    placeholder="7"
                    value={settings.listViewOptions.customDateRangeDays || ''}
                    onChange={(e) => updateSettings({ listViewOptions: { ...settings.listViewOptions, customDateRangeDays: e.target.value ? Number(e.target.value) : 0 } })}
                    disabled={settings.listViewOptions.dateRangeMode !== 'custom'}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Столбцы таблицы</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-start-time">Время начала сессии</Label>
                    <Switch
                      id="show-start-time"
                      checked={settings.listViewOptions.showStartTime}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showStartTime: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-end-time">Время окончания сессии</Label>
                    <Switch
                      id="show-end-time"
                      checked={settings.listViewOptions.showEndTime}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showEndTime: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-session-count">Кол-во сессий за день</Label>
                    <Switch
                      id="show-session-count"
                      checked={settings.listViewOptions.showSessionCount}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showSessionCount: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-duration">Общая длительность</Label>
                    <Switch
                      id="show-duration"
                      checked={settings.listViewOptions.showDuration}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showDuration: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-hands-per-hour">Рук в час</Label>
                    <Switch
                      id="show-hands-per-hour"
                      checked={settings.listViewOptions.showHandsPerHour}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showHandsPerHour: checked } })}
                      disabled={!settings.showHands}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-daily-plan">План на день (часы)</Label>
                    <Switch
                      id="show-daily-plan"
                      checked={settings.listViewOptions.showDailyPlan}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showDailyPlan: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-daily-plan-remaining">Осталось по плану на день</Label>
                    <Switch
                      id="show-daily-plan-remaining"
                      checked={settings.listViewOptions.showDailyPlanRemaining}
                      onCheckedChange={(checked) => updateSettings({ listViewRangeOptions: { ...settings.listViewOptions, showDailyPlanRemaining: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-total-play-time">Общее игровое время за день</Label>
                    <Switch
                      id="show-total-play-time"
                      checked={settings.listViewOptions.showTotalPlayTime}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showTotalPlayTime: checked } })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-total-plan-remaining">Осталось по общему плану</Label>
                    <Switch
                      id="show-total-plan-remaining"
                      checked={settings.listViewOptions.showTotalPlanRemaining}
                      onCheckedChange={(checked) => updateSettings({ listViewOptions: { ...settings.listViewOptions, showTotalPlanRemaining: checked } })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки вида 'Календарь'</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Настройки для вида "Календарь" будут добавлены здесь */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки сессии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-splitting">Включить разделение</Label>
                <Switch
                  id="enable-splitting"
                  checked={settings.enableSplitting}
                  onCheckedChange={(checked) => updateSettings({ enableSplitting: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-notes">Показывать поле 'Заметки'</Label>
                <Switch
                  id="show-notes"
                  checked={settings.showNotes}
                  onCheckedChange={(checked) => updateSettings({ showNotes: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-hands">Показывать поле 'Количество рук'</Label>
                <Switch
                  id="show-hands"
                  checked={settings.showHands}
                  onCheckedChange={(checked) => updateSettings({ showHands: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Планирование</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="monthly-hours">Часов в месяц</Label>
                <Input
                  type="number"
                  id="monthly-hours"
                  placeholder="100"
                  value={settings.monthlyHours || ''}
                  onChange={(e) => updateSettings({ monthlyHours: e.target.value ? Number(e.target.value) : 0 })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="monthly-hands">Рук в месяц</Label>
                <Input
                  type="number"
                  id="monthly-hands"
                  placeholder="25000"
                  value={settings.monthlyHands || ''}
                  onChange={(e) => updateSettings({ monthlyHands: e.target.value ? Number(e.target.value) : 0 })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
