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
}
