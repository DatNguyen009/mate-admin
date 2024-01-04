import { Label } from "reactstrap";

import styled from "styled-components";

const mappingLevel = {
  0: {
    fontSize: 12,
    fontWeight: 600,
  },
  1: {
    fontSize: 16,
    fontWeight: 600,
  },
  2: {
    fontSize: 20,
    fontWeight: 700,
  },
  3: {
    fontSize: 14,
    fontWeight: 500,
  },
  3: {
    fontSize: 22,
    fontWeight: 600,
  },
  4: {
    fontSize: 16,
    fontWeight: 400,
  },
  5: {
    fontSize: 12,
    fontWeight: 600,
  },
  6: {
    fontSize: 36,
    fontWeight: 400,
  },
  7: {
    fontSize: 13,
    fontWeight: 400,
  },
  8: {
    fontSize: 13,
    fontWeight: 600,
  },
  9: {
    fontSize: 26,
    fontWeight: 600,
  },
  10: {
    fontSize: 16,
    fontWeight: 600,
  },
};

export const CommonText = styled(Label)`
  & {
    font-size: ${({ level = 0 }) => `${mappingLevel[level].fontSize}px`};
    font-weight: ${({ level = 0 }) => `${mappingLevel[level].fontWeight}`};
    color: ${({ color }) => `${color}`};
    margin-top: ${({ mt }) => `${mt}px`};
    margin-bottom: ${({ mb }) => `${mb}px`};
    margin-left: ${({ ml }) => `${ml}px`};
  }
`;
