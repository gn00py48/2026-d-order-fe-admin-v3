import { HourlyRevenue } from '../_apis/getBoothStatistics';
import * as S from '../StatisticsPage.styled';

interface RevenueChartProps {
  data: HourlyRevenue[];
  formatRevenue: (value: number) => string;
}

const RevenueChart = ({ data, formatRevenue }: RevenueChartProps) => {
  const maxRevenue = Math.max(...data.map((item) => item.revenue), 0);

  if (data.length === 0) {
    return <S.EmptyText>데이터가 없습니다.</S.EmptyText>;
  }

  return (
    <S.ChartScroller>
      <S.ChartGrid>
        {data.map((item) => {
          const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;

          return (
            <S.BarColumn key={item.hour}>
              <S.BarValue>{formatRevenue(item.revenue)}</S.BarValue>
              <S.BarTrack>
                <S.BarFill $height={height} />
              </S.BarTrack>
              <S.BarLabel>{item.hour}</S.BarLabel>
            </S.BarColumn>
          );
        })}
      </S.ChartGrid>
    </S.ChartScroller>
  );
};

export default RevenueChart;
