import React from "react";
import "./Pagination.css";

interface Props {
    infoPerPage: number;
    totalData: number;
    paginate: (pageNumber: number) => void;
}

const Pagination = ({ infoPerPage, totalData, paginate }: Props) => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalData / infoPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="page">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className="btn-page"
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
