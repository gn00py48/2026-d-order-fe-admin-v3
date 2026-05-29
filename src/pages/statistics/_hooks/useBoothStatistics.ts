import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AllBoothStatisticsItem,
  getAllBoothStatistics,
} from '../_apis/getBoothStatistics';

const useBoothStatistics = () => {
  const [booths, setBooths] = useState<AllBoothStatisticsItem[]>([]);
  const [selectedBoothUuid, setSelectedBoothUuid] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllBoothStatistics();

      setBooths(data);
      setSelectedBoothUuid((prev) => prev ?? data[0]?.booth_uuid ?? null);
    } catch {
      setError('통계 데이터를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadStatistics = async () => {
      if (!isMounted) return;
      await fetchStatistics();
    };

    loadStatistics();

    return () => {
      isMounted = false;
    };
  }, [fetchStatistics]);

  const selectedBooth = useMemo(
    () =>
      booths.find((booth) => booth.booth_uuid === selectedBoothUuid) ??
      booths[0] ??
      null,
    [booths, selectedBoothUuid],
  );

  return {
    booths,
    selectedBooth,
    selectedBoothUuid,
    setSelectedBoothUuid,
    isLoading,
    error,
    refetch: fetchStatistics,
  };
};

export default useBoothStatistics;
