import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Bar = styled.div`
    margin-bottom: 40px;
`;

const Logo = styled.div`
    font-size: 1.5em;
`;

export default function() {
    return (
        <Bar>
            <Logo> Stable Dominance </Logo>
        </Bar>
    );
}
