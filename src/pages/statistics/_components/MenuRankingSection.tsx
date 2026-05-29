import { MenuStatItem } from '../_apis/getBoothStatistics';
import * as S from '../StatisticsPage.styled';

interface MenuRankingSectionProps {
  index: string;
  title: string;
  items: MenuStatItem[];
  formatRevenue: (value: number) => string;
  formatCount: (value: number) => string;
  formatMinutes: (value: number | null) => string;
}

const MenuRankingSection = ({
  index,
  title,
  items,
  formatRevenue,
  formatCount,
  formatMinutes,
}: MenuRankingSectionProps) => (
  <S.RankingCard>
    <S.RankingHeader>
      <S.CardIndex>{index}</S.CardIndex>
      <S.RankingTitle>{title}</S.RankingTitle>
    </S.RankingHeader>

    {items.length === 0 ? (
      <S.EmptyText>데이터가 없습니다.</S.EmptyText>
    ) : (
      <S.RankingList>
        {items.slice(0, 5).map((item, itemIndex) => (
          <S.MenuItem key={`${item.menu_id ?? item.name}-${itemIndex}`}>
            {item.image_url ? (
              <S.MenuImage src={item.image_url} alt={item.name} />
            ) : (
              <S.NoImage>No Image</S.NoImage>
            )}
            <S.MenuInfo>
              <S.MenuName>{item.name}</S.MenuName>
              <S.MenuMeta>
                판매 {formatCount(item.sold_quantity)}건
                <span>매출 {formatRevenue(item.total_revenue)}</span>
              </S.MenuMeta>
              <S.MenuMeta>
                재고 {item.stock ?? '-'}
                <span>평균 서빙 {formatMinutes(item.avg_serving_minutes)}</span>
              </S.MenuMeta>
            </S.MenuInfo>
          </S.MenuItem>
        ))}
      </S.RankingList>
    )}
  </S.RankingCard>
);

export default MenuRankingSection;
