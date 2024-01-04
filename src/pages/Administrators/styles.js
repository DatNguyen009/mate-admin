import styled from "styled-components";

export const Horizontal = styled.div`
  &::before {
    content: "";
    position: absolute;
    background: #e0e0e0;
    width: 1px;
    height: 100%;
    left: -2%;
    top: 0;
  }
`;
