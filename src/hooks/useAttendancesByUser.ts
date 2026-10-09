import { useEffect, useRef, useState } from 'react';

import { Feedback } from '../components/ui/alert/types/AlertFeedback';
import { attendanceService } from '../service/attendance.service';
import { Attendance, AttendancePageSize } from '../service/types/Attendance';

type SortConfig = {
    key: 'check_in_at';
    direction: 'asc' | 'desc';
};

export function useAttendancesByUser(userId: string) {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [attendance, setAttendance] = useState<Attendance | null>(null);
    const [listAttendances, setListAttendances] = useState<Attendance[]>([]);
    const [searchText, setSearchText] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<AttendancePageSize>(10);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'check_in_at',
        direction: 'desc',
    });
    const [isLoading, setIsLoading] = useState(false);
    const previousUserId = useRef(userId);

    useEffect(() => {
        let isCurrent = true;
        const userChanged = previousUserId.current !== userId;
        previousUserId.current = userId;

        if (userChanged) {
            setAttendance(null);
            setSearchText('');
            setAppliedSearch('');
            setPage(1);
            setSortConfig({ key: 'check_in_at', direction: 'desc' });
        }

        const requestPage = userChanged ? 1 : page;
        const requestSearch = userChanged ? '' : appliedSearch;
        const requestDirection = userChanged ? 'desc' : sortConfig.direction;

        const getData = async () => {
            setFeedback(null);
            setListAttendances([]);
            setIsLoading(true);

            try {
                const resp = await attendanceService.getByUser({
                    user_id: userId,
                    page: requestPage,
                    pageSize,
                    search: requestSearch,
                    sortBy: 'check_in_at',
                    sortDirection: requestDirection,
                });
                if (resp.error) throw resp.error;

                const data = resp.data ?? [];

                if (!isCurrent) return;

                setListAttendances(data);
                setTotal(resp.pagination?.total ?? 0);

                if (
                    requestPage === 1 &&
                    !requestSearch &&
                    requestDirection === 'desc'
                ) {
                    setAttendance(data[0] ?? null);
                }
            } catch (error) {
                if (!isCurrent) return;

                console.error('Error No se puede obtener datos', error);
                setFeedback({
                    variant: 'error',
                    title: 'No se puede obtener datos',
                    message:
                        'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
                });
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        void getData();

        return () => {
            isCurrent = false;
        };
    }, [userId, page, pageSize, appliedSearch, sortConfig.direction]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = () => {
        setPage(1);
        setAppliedSearch(searchText.trim());
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
    };

    const handlePageSizeChange = (nextPageSize: AttendancePageSize) => {
        setPage(1);
        setPageSize(nextPageSize);
    };

    const handleSortChange = (nextSort: SortConfig) => {
        setPage(1);
        setSortConfig(nextSort);
    };

    return {
        feedback,
        attendance,
        listAttendances,
        searchText,
        isLoading,
        page,
        pageSize,
        total,
        sortConfig,
        handleSearch,
        handleSearchSubmit,
        handlePageChange,
        handlePageSizeChange,
        handleSortChange,
    };
}
