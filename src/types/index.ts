export interface SessionPeriod {
  type: 'select' | 'play';
  startTime: string; // ISO-8601
  endTime: string;   // ISO-8601
}

export interface Session {
  id: string; // e.g., timestamp
  overallStartTime: string; // ISO-8601
  overallEndTime: string;   // ISO-8601
  notes: string;
  handsPlayed: number;
  periods: SessionPeriod[];
}

export interface ListViewOptions {
  // Формат даты
  showMonth: boolean;
  showDayOfWeek: boolean;
  // Фильтр по датам
  dateRangeMode: 'all' | 'month' | 'week' | 'custom';
  customDateRangeDays: number;
  // Столбцы
  showStartTime: boolean;
  showEndTime: boolean;
  showSessionCount: boolean;
  showDuration: boolean;
  showHandsPerHour: boolean;
  showDailyPlan: boolean;
  showDailyPlanRemaining: boolean;
  showTotalPlayTime: boolean;
  showTotalPlanRemaining: boolean;
}

export interface Settings {
  theme: 'dark' | 'light';
  view: 'list' | 'calendar' | 'custom';
  splitPeriods: boolean;
  showNotes: boolean;
  showHandsPlayed: boolean;
  goals: {
    hours: number;
    hands: number;
    sessions: number;
  };
  listViewOptions: ListViewOptions;
}
