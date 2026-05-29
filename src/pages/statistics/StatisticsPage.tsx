import { type ChangeEvent } from 'react';
import MenuRankingSection from './_components/MenuRankingSection';
import RevenueChart from './_components/RevenueChart';
import StatCard from './_components/StatCard';
import { DailyRevenue, MenuStats } from './_apis/getBoothStatistics';
import useBoothStatistics from './_hooks/useBoothStatistics';
import * as S from './StatisticsPage.styled';

const FESTIVAL_DAY_LABELS: Record<string, string> = {
  '2026-05-26': '1일차',
  '2026-05-27': '2일차',
  '2026-05-28': '3일차',
};

const numberFormatter = new Intl.NumberFormat('ko-KR');

const formatCount = (value: number) => numberFormatter.format(value);

const formatRevenue = (value: number) => `${numberFormatter.format(value)}원`;

const formatMinutes = (value: number | null) =>
  value === null ? '-' : `${numberFormatter.format(Math.round(value))}분`;

const formatNullableText = (value: string | null) => value ?? '-';

const getDayLabel = (item: DailyRevenue, index: number) =>
  FESTIVAL_DAY_LABELS[item.date] ?? `${index + 1}일차`;

const getBoothLabel = (boothName: string | null | undefined, boothId: number) =>
  boothName?.trim() || `부스 ${boothId}`;

const getRankingItems = (menuStats: MenuStats | undefined) => [
  {
    index: '01',
    title: '비인기 메뉴',
    items: menuStats?.least_sold ?? [],
  },
  {
    index: '02',
    title: '서빙까지 오래 걸린 메뉴',
    items: menuStats?.slowest_served ?? [],
  },
  {
    index: '03',
    title: '재고가 가장 적게 남은 메뉴',
    items: menuStats?.least_stock ?? [],
  },
  {
    index: '04',
    title: '매출이 높은 메뉴',
    items: menuStats?.highest_revenue ?? [],
  },
];

const StatisticsPage = () => {
  const {
    booths,
    selectedBooth,
    selectedBoothUuid,
    setSelectedBoothUuid,
    isLoading,
    error,
  } = useBoothStatistics();

  const handleBoothChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoothUuid(event.target.value);
  };

  const handlePdfExport = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <S.StatisticsPageWrapper>
        <S.StateBox>로딩 중...</S.StateBox>
      </S.StatisticsPageWrapper>
    );
  }

  if (error) {
    return (
      <S.StatisticsPageWrapper>
        <S.StateBox>{error}</S.StateBox>
      </S.StatisticsPageWrapper>
    );
  }

  if (!selectedBooth) {
    return (
      <S.StatisticsPageWrapper>
        <S.StateBox>통계 데이터가 없습니다.</S.StateBox>
      </S.StatisticsPageWrapper>
    );
  }

  const { booth_stats, menu_stats } = selectedBooth;
  const dailyRevenue = booth_stats.daily_revenue ?? [];
  const hourlyRevenue = booth_stats.hourly_revenue ?? [];
  const rankingItems = getRankingItems(menu_stats);
  const selectedBoothName = getBoothLabel(
    selectedBooth.booth_name,
    selectedBooth.booth_id,
  );

  return (
    <>
      <S.PrintPageStyle />
      <S.StatisticsPageWrapper>
        <S.DashboardShell>
          <S.DashboardContainer>
          <S.Header>
            <S.TitleGroup>
              <S.Title>{selectedBoothName} 통계</S.Title>
              <S.Description>
                디오더를 통해 처리된 데이터를 활용한 통계입니다.
              </S.Description>
            </S.TitleGroup>

            <S.Toolbar>
              <S.SelectorPanel>
                <S.SelectLabel htmlFor="booth-statistics-selector">
                  부스 선택
                </S.SelectLabel>
                <S.BoothSelect
                  id="booth-statistics-selector"
                  value={selectedBoothUuid ?? selectedBooth.booth_uuid}
                  onChange={handleBoothChange}
                >
                  {booths.map((booth) => (
                    <option key={booth.booth_uuid} value={booth.booth_uuid}>
                      {getBoothLabel(booth.booth_name, booth.booth_id)}
                    </option>
                  ))}
                </S.BoothSelect>
                <S.SelectHelper>
                  선택 변경 시 이미 불러온 전체 통계 데이터로 화면을
                  갱신합니다.
                </S.SelectHelper>
              </S.SelectorPanel>

              <S.PdfButton type="button" onClick={handlePdfExport}>
                PDF 추출
              </S.PdfButton>
            </S.Toolbar>
          </S.Header>

          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>기본 정보</S.SectionTitle>
            </S.SectionHeader>
            <S.CardGrid>
              <StatCard
                index="01"
                label="총 주문 건수"
                value={`${formatCount(booth_stats.total_orders)}건`}
              />
              <StatCard
                index="02"
                label="평균 조리 시간"
                value={formatMinutes(booth_stats.avg_cooking_minutes)}
              />
              <StatCard
                index="03"
                label="평균 서빙 시간"
                value={formatMinutes(booth_stats.avg_serving_minutes)}
              />
              <StatCard
                index="04"
                label="평균 테이블 이용 시간"
                value={formatMinutes(booth_stats.avg_table_usage_minutes)}
              />
              <StatCard
                index="05"
                label="테이블 수"
                value={`${formatCount(booth_stats.table_count)}개`}
              />
              <StatCard
                index="06"
                label="피크 타임"
                value={formatNullableText(booth_stats.peak_time)}
              />
              <StatCard
                index="07"
                label="총 매출"
                value={formatRevenue(booth_stats.total_revenue)}
              />
            </S.CardGrid>
          </S.Section>

          <S.Section>
            <S.Description>

              </S.Description>
            <S.SectionHeader>
              <S.SectionTitle>매출</S.SectionTitle>
            </S.SectionHeader>
            <S.RevenueLayout>
              <S.DailyGrid>
                {dailyRevenue.length === 0 ? (
                  <S.EmptyText>데이터가 없습니다.</S.EmptyText>
                ) : (
                  dailyRevenue.map((item, index) => (
                    <StatCard
                      key={item.date}
                      index={`0${index + 1}`}
                      label={`${getDayLabel(item, index)} 매출`}
                      value={formatRevenue(item.revenue)}
                      caption={item.date}
                    />
                  ))
                )}
                <StatCard
                  index="04"
                  label="피크 타임"
                  value={formatNullableText(booth_stats.peak_time)}
                />
              </S.DailyGrid>

              <S.ChartPanel>
                <S.ChartTitle>시간대별 매출</S.ChartTitle>
                <RevenueChart
                  data={hourlyRevenue}
                  formatRevenue={formatRevenue}
                />
              </S.ChartPanel>
            </S.RevenueLayout>
          </S.Section>

          <S.Section>
            <S.Description>

              </S.Description>
            <S.SectionHeader>
              <S.SectionTitle>메뉴</S.SectionTitle>
            </S.SectionHeader>
            <S.RankingGrid>
              {rankingItems.map((ranking) => (
                <MenuRankingSection
                  key={ranking.title}
                  index={ranking.index}
                  title={ranking.title}
                  items={ranking.items}
                  formatRevenue={formatRevenue}
                  formatCount={formatCount}
                  formatMinutes={formatMinutes}
                />
              ))}
            </S.RankingGrid>
          </S.Section>
          </S.DashboardContainer>
        </S.DashboardShell>
      </S.StatisticsPageWrapper>
    </>
  );
};

export default StatisticsPage;
