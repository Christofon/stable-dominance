import React from "react";
import styled, { css } from "styled-components";
import Logo from "./Logo";

const Bar = styled.div`
    margin-bottom: 40px;
`;

export default function() {
    return (
        <Bar>
            <Logo />
        </Bar>
    );
}
