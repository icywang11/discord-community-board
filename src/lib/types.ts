export type WeeklyPulse = {
  region: string;
  period: string;
  month: string;
  members: number;
  messages: number;
  visitors: number;
};

export type Activity = {
  id: string;
  community: string;
  name: string;
  month: string;
  period: string;
  type: string;
  region: string;
  participants: number;
  visits: number;
  engagement: number;
  jp: number;
  tw: number;
  en: number;
  rate: number;
  note: string;
  extra: Record<string, number>;
};

export type Community = {
  id: string;
  label: string;
  kana: string;
  period: string;
  blurb: string;
  accent: "pink" | "mint" | "grape" | "sun";
  mascot: "berry" | "mint" | "grape" | "pudding";
  activities: Activity[];
  weekly: WeeklyPulse[];
};

export type Catalog = {
  title: string;
  subtitle: string;
  updatedAt: string;
  communities: Community[];
};
