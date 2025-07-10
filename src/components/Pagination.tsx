import React from "react";
import "./Pagination.css";
import { useSearchParams } from "react-router-dom";

interface Props {
    infoPerPage: number;
    totalData: number;
    paginate: (pageNumber: number) => void;
}

const Pagination = ({ infoPerPage, totalData, paginate }: Props) => {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page"));

    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalData / infoPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="page">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`btn-page ${
                        currentPage === number && "btn-page-active"
                    }`}
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
