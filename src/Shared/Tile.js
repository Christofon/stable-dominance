import styled from "styled-components";

import {
  subtleBoxShadow,
  lightBlueBackground,
  BoxShadow,
} from "./Styles";

export const Tile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
    padding: 10px;
`;

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${BoxShadow}
  }
`;

export const DisabledTile = styled(Tile)`
  pointer-events: none;
  opacity: 0.4;
`;
