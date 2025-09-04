/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

interface PaginationProps {
    currentPage: number;
    count: number;
    onPageChange: (page: number) => void;
    rows: number;
}

export default function PaginationCommon(props: PaginationProps) {
    const { currentPage, count, onPageChange, rows } = props;
    const totalPage = useRef<number>(Math.ceil(count / rows));

    const [pages, setPages] = useState<any[]>([]);
    const [pre10, setPre10] = useState<number>(0);
    const [next10, setNext10] = useState<number>(0);

    useEffect(() => {
        const _rows = rows;
        totalPage.current = Math.ceil(count / _rows);

        const pageNumbers: any[] = [];
        const pageStart = Math.floor((currentPage - 1) / _rows) * _rows + 1;
        const pageEnd = Math.min(pageStart + _rows - 1, totalPage.current);

        for (let i = pageStart; i <= pageEnd; i++) {
            pageNumbers.push({ page: i });
        }

        setNext10(pageEnd < totalPage.current ? pageEnd + 1 : 0);
        setPre10(pageStart > 1 ? pageStart - 1 : 0);

        setPages(pageNumbers);
    }, [count, rows, currentPage]);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {/* Previous button */}
                {currentPage > 1 && (
                    <li className="page-item">
                        <a
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &laquo;
                        </a>
                    </li>
                )}

                {/* Ellipsis for previous pages */}
                {pre10 > 0 && (
                    <li className="page-item">
                        <a
                            className="page-link"
                            onClick={() => handlePageChange(pre10)}
                        >
                            ...
                        </a>
                    </li>
                )}

                {/* Page numbers */}
                {pages.map((item) =>
                    item.page === currentPage ? (
                        <li key={item.page} className="page-item active">
                            <span className="page-link">{item.page}</span>
                        </li>
                    ) : (
                        <li key={item.page} className="page-item">
                            <a
                                className="page-link"
                                onClick={() => handlePageChange(item.page)}
                            >
                                {item.page}
                            </a>
                        </li>
                    )
                )}

                {/* Ellipsis for next pages */}
                {next10 > 0 && (
                    <li className="page-item">
                        <a
                            className="page-link"
                            onClick={() => handlePageChange(next10)}
                        >
                            ...
                        </a>
                    </li>
                )}

                {/* Next button */}
                {currentPage < totalPage.current && (
                    <li className="page-item">
                        <a
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &raquo;
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
}
