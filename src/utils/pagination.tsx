type PaginationProps = {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (newPage: number) => void;
};

export function Pagination({
    page,
    pageSize,
    total,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(total / pageSize);

    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1 || total === 0}>
                {"<"}
            </button>
            <span>
                Page {total === 0 ? 0 : page} / {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={page === totalPages || total === 0}
            >
                {">"}
            </button>
        </div>
    );
}
