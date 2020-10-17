import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  margin-top: 20px;
`;

const SocialButtons = styled.div`
  text-align: center;
`;

const Link = styled.a`
  margin: 20px;
`;

export default function () {
  return (
    <Bar>
      <SocialButtons>
        <Link href="https://twitter.com/stabledominance" target="_blank">Twitter</Link>
        <Link href="https://medium.com/stabledominance" target="_blank">Medium</Link>
      </SocialButtons>
    </Bar>
  );
}
