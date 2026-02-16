
export type BookingStatus = 'reserved' | 'suggested' | 'none';

export interface TripActivity {
  type: 'activity' | 'restaurant' | 'transport' | 'info';
  time: string;
  duration?: string;
  location: string;
  description: string;
  hours?: string; // 營業時間
  cuisine?: string; // 餐廳類型
  mapUrl?: string;
  websiteUrl?: string;
  bookingStatus?: BookingStatus;
  platform?: string;
  arrivalNotice?: string;
}

export interface TripDay {
  dayNumber: number;
  date: string;
  shortDate: string;
  title: string;
  location?: string;
  drivingTime?: string;
  weatherForecast?: {
    temp: string;
    condition: string;
  };
  outfitSuggestion?: string;
  accommodation: {
    name: string;
    address: string;
    mapUrl: string;
  };
  activities: TripActivity[];
}

export interface TravelReminder {
  category: string;
  icon: string;
  items: string[];
}

export interface TripItinerary {
  title: string;
  destination: string;
  duration: string;
  days: TripDay[];
  essentialInfo: {
    currency: string;
    weather: string;
    voltage: string;
    drivingSide: string;
  };
  packingList: {
    category: string;
    items: string[];
  }[];
  reminders: TravelReminder[];
}
