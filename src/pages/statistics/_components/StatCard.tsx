import * as S from '../StatisticsPage.styled';

interface StatCardProps {
  index: string;
  label: string;
  value: string;
  caption?: string;
}

const StatCard = ({ index, label, value, caption }: StatCardProps) => (
  <S.StatCard>
    <S.CardIndex>{index}</S.CardIndex>
    <S.StatLabel>{label}</S.StatLabel>
    <S.StatValue>{value}</S.StatValue>
    {caption && <S.StatCaption>{caption}</S.StatCaption>}
  </S.StatCard>
);

export default StatCard;
