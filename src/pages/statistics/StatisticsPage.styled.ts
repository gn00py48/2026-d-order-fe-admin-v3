import styled, { createGlobalStyle } from 'styled-components';

export const PrintPageStyle = createGlobalStyle`
  @page {
    size: A4 landscape;
    margin: 14mm 16mm 14mm 16mm;
  }

  @media print {
    *,
    *::before,
    *::after {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html,
    body {
      width: 100%;
      height: auto;
      min-height: auto;
      margin: 0;
      overflow: visible;
      background: #ffffff;
    }
  }
`;

export const StatisticsPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 28px clamp(24px, 5vw, 72px);
  box-sizing: border-box;
  background: #2f2b28;
  color: ${({ theme }) => theme.colors.Black01};

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media print {
    width: 100%;
    max-width: none;
    height: auto;
    min-height: auto;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: visible;
    background: #ffffff;

    &,
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

export const DashboardShell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1360px;
  min-height: calc(100vh - 56px);
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 28px;
  background: #2f2b28;

  @media print {
    width: 100%;
    max-width: none;
    height: auto;
    min-height: auto;
    margin: 0;
    border-radius: 0;
    overflow: visible;
    transform: none;
    background: #ffffff;
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  border-radius: 24px;
  background: #fffaf3;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 18px;
  }

  @media print {
    gap: 8mm;
    width: 100%;
    max-width: none;
    height: auto;
    min-height: auto;
    margin: 0;
    padding: 0;
    border-radius: 0;
    overflow: visible;
    background: #ffffff;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }

  @media print {
    align-items: flex-start;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h1`
  margin: 0;
  color: #231f20;
  ${({ theme }) => theme.fonts.ExtraBold26};
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.Medium14};
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }

  @media print {
    display: none !important;
  }
`;

export const SelectorPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(100%, 320px);
  padding: 14px 16px;
  box-sizing: border-box;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.Orange00};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SelectLabel = styled.label`
  color: ${({ theme }) => theme.colors.Highlight};
  ${({ theme }) => theme.fonts.Bold14};
`;

export const BoothSelect = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid rgba(255, 110, 63, 0.28);
  border-radius: 10px;
  outline: none;
  background: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Black01};
  ${({ theme }) => theme.fonts.Bold14};

  &:focus {
    border-color: ${({ theme }) => theme.colors.Orange01};
  }
`;

export const SelectHelper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.Medium12};
`;

export const PdfButton = styled.button`
  align-self: flex-start;
  min-width: 112px;
  height: 48px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.Orange01};
  color: ${({ theme }) => theme.colors.White};
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 110, 63, 0.22);
  ${({ theme }) => theme.fonts.Bold14};

  &:hover {
    background: ${({ theme }) => theme.colors.Orange02};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media print {
    gap: 4mm;
    break-inside: avoid;
    page-break-inside: avoid;
    overflow: visible;

    & + & {
      margin-top: 10mm;
    }
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.Orange01};
  ${({ theme }) => theme.fonts.ExtraBold20};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6mm;
    overflow: visible;
  }
`;

export const StatCard = styled.article`
  position: relative;
  min-height: 128px;
  padding: 18px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 110, 63, 0.12);
  border-radius: 18px;
  background: #f8efe4;
  overflow: hidden;

  @media print {
    height: auto;
    max-height: none;
    min-height: 28mm;
    padding: 4mm;
    border-radius: 4mm;
    overflow: visible;
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

export const CardIndex = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 26px;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.Orange01};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Bold12};
`;

export const StatLabel = styled.p`
  margin: 14px 0 8px;
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.Bold14};
`;

export const StatValue = styled.strong`
  display: block;
  color: ${({ theme }) => theme.colors.Black01};
  word-break: keep-all;
  overflow-wrap: anywhere;
  ${({ theme }) => theme.fonts.ExtraBold24};
`;

export const StatCaption = styled.span`
  display: block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.Medium12};
`;

export const RevenueLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(420px, 1.8fr);
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: 1fr;
    gap: 6mm;
    overflow: visible;
  }
`;

export const DailyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6mm;
    overflow: visible;
  }
`;

export const ChartPanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 280px;
  padding: 22px;
  box-sizing: border-box;
  border-radius: 18px;
  background: #f8efe4;

  @media print {
    height: auto;
    max-height: none;
    min-height: auto;
    padding: 4mm;
    border-radius: 4mm;
    overflow: visible;
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

export const ChartTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.Black01};
  ${({ theme }) => theme.fonts.Bold18};
`;

export const ChartScroller = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;

  @media print {
    max-width: 100%;
    height: auto;
    max-height: none;
    overflow: visible;
  }
`;

export const ChartGrid = styled.div<{ $columnCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columnCount }) => $columnCount}, minmax(0, 1fr));
  align-items: end;
  gap: clamp(6px, 1vw, 12px);
  min-width: 0;
  height: 220px;

  @media print {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    min-height: 43mm;
    max-height: none;
    gap: 2mm;
    overflow: visible;
  }
`;

export const BarColumn = styled.div`
  display: grid;
  grid-template-rows: 36px 1fr 24px;
  align-items: end;
  min-width: 0;
  height: 100%;

  @media print {
    height: 43mm;
    overflow: visible;
  }
`;

export const BarValue = styled.span`
  align-self: start;
  color: ${({ theme }) => theme.colors.Gray03};
  text-align: center;
  overflow-wrap: anywhere;
  ${({ theme }) => theme.fonts.SemiBold10};

  @media print {
    font-size: 10px;
    line-height: 1.25;
  }
`;

export const BarTrack = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 999px;
  background: rgba(255, 110, 63, 0.13);
  overflow: hidden;

  @media print {
    height: 30mm;
    overflow: hidden;
  }
`;

export const BarFill = styled.div<{ $height: number }>`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${({ $height }) => Math.max($height, 2)}%;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.Orange01};
`;

export const BarLabel = styled.span`
  align-self: end;
  color: ${({ theme }) => theme.colors.Black02};
  text-align: center;
  ${({ theme }) => theme.fonts.Bold12};

  @media print {
    font-size: 10px;
    line-height: 1.2;
  }
`;

export const RankingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6mm;
    overflow: visible;
  }
`;

export const RankingCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 18px;
  background: #f8efe4;

  @media print {
    gap: 3mm;
    height: auto;
    max-height: none;
    padding: 4mm;
    border-radius: 4mm;
    overflow: visible;
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

export const RankingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RankingTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.Black01};
  ${({ theme }) => theme.fonts.Bold18};
`;

export const RankingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media print {
    gap: 2mm;
    height: auto;
    max-height: none;
    overflow: visible;
  }
`;

export const MenuItem = styled.li`
  display: flex;
  gap: 10px;
  min-width: 0;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);

  @media print {
    gap: 2mm;
    height: auto;
    max-height: none;
    padding: 2mm;
    border-radius: 3mm;
    overflow: visible;
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

export const MenuImage = styled.img`
  flex: 0 0 auto;
  width: 58px;
  height: 58px;
  border-radius: 12px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.Gray01};

  @media print {
    width: 12mm;
    height: 12mm;
    border-radius: 2mm;
  }
`;

export const NoImage = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.Gray01};
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.SemiBold10};

  @media print {
    width: 12mm;
    height: 12mm;
    border-radius: 2mm;
  }
`;

export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  min-width: 0;
`;

export const MenuName = styled.strong`
  color: ${({ theme }) => theme.colors.Black01};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.fonts.Bold16};

  @media print {
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
  }
`;

export const MenuMeta = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.Medium12};
`;

export const EmptyText = styled.div`
  display: flex;
  align-items: center;
  min-height: 96px;
  color: ${({ theme }) => theme.colors.Gray03};
  ${({ theme }) => theme.fonts.Bold14};
`;

export const StateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 360px;
  padding: 32px;
  box-sizing: border-box;
  border-radius: 24px;
  background: #fffaf3;
  color: ${({ theme }) => theme.colors.Black02};
  ${({ theme }) => theme.fonts.Bold18};
`;
