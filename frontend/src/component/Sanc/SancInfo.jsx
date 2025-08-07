import React from "react";
import { useSelector } from "react-redux";

const SancInfo = () => {
    const sanctions = useSelector((state) => state.ownCountry.sanctionsFrom);

    if (sanctions.length !== 0) {
        return (
            <p>
                На вас наложили санкции: <b>{sanctions.join(", ")}</b>
            </p>
        );
    }
    return <p>Ни одна из стран не наложила на вас санкции</p>;
};

export default SancInfo;
