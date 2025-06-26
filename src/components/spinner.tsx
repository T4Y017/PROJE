import React from "react";
import { ClipLoader } from "react-spinners";
import "./spinner.css";
type Props = {
    isLoading?: boolean;
};

const Spinner = ({ isLoading = true }: Props) => {
    return (
        <>
            <div className="loading-spinner">
                <ClipLoader color="#36d7b7" loading={isLoading} size={35} />
            </div>
        </>
    );
};

export default Spinner;
