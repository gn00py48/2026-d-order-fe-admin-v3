import { instance } from '@services/instance';

export interface BoothStats {
  total_orders: number;
  avg_cooking_minutes: number | null;
  avg_serving_minutes: number | null;
  avg_table_usage_minutes: number | null;
  table_count: number;
  total_revenue: number;
  daily_revenue: DailyRevenue[];
  hourly_revenue: HourlyRevenue[];
  peak_time: string | null;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface HourlyRevenue {
  hour: string;
  revenue: number;
}

export interface MenuStatItem {
  menu_id: number | null;
  name: string;
  image_url: string | null;
  stock: number | null;
  sold_quantity: number;
  total_revenue: number;
  avg_serving_minutes: number | null;
}

export interface MenuStats {
  least_sold: MenuStatItem[];
  slowest_served: MenuStatItem[];
  least_stock: MenuStatItem[];
  highest_revenue: MenuStatItem[];
}

export interface BoothStatisticsData {
  booth_stats: BoothStats;
  menu_stats: MenuStats;
}

export interface BoothStatisticsResponse {
  message: string;
  data: BoothStatisticsData;
}

export interface AllBoothStatisticsItem extends BoothStatisticsData {
  booth_id: number;
  booth_uuid: string;
  booth_name: string;
}

export interface AllBoothStatisticsResponse {
  message: string;
  data: AllBoothStatisticsItem[];
}

export const getMyBoothStatistics = async (): Promise<BoothStatisticsData> => {
  const response = await instance.get<BoothStatisticsResponse>(
    '/api/v3/django/booth/statistics/',
  );

  return response.data.data;
};

export const getAllBoothStatistics = async (): Promise<
  AllBoothStatisticsItem[]
> => {
  const response = await instance.get<AllBoothStatisticsResponse>(
    '/api/v3/django/booth/statistics/all/',
  );

  return response.data.data;
};
