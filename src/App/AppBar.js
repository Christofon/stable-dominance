import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const Bar = styled.div`
  margin-bottom: 20px;
`;

export default function () {
  return (
    <Bar>
      <Logo />
    </Bar>
  );
}
