import styled from "styled-components";

const mappingLevel = {
  0: {
    color: "var(--white)",
    background: "var(--primary)",
    backgroundHover: "var(--bs-blue)",
  },
  1: {
    color: "var(--black)",
    background: "var(--white)",
    backgroundHover: "var(--gray-100)",
  },
  2: {
    color: "var(--white)",
    background: "var(--del-red)",
    backgroundHover: "var(--del-red-hover)",
  },
  3: {
    color: "var(--white)",
    background: "green",
    backgroundHover: "#00cc00",
  },
  4: {
    color: "var(--white)",
    background: "#ff8533",
    backgroundHover: "#ff6600",
  },
};

export const CommonButton = styled.button`
  transition: all 0.2s ease;
  min-width: 38px;
  min-height: 38px;
  height: var(--btn-height);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 0 12px;
  border-color: #f9fafa;
  box-shadow: var(--btn-shadow);
  transition: all ease 0.25s;

  & {
    color: ${({ level = 1 }) => `${mappingLevel[level].color}`};
    background-color: ${({ level = 1 }) => `${mappingLevel[level].background}`};
    font-size: ${({ sz }) => `${sz}px`};
    height: ${({ height }) => `${height}px`};
    margin-left: ${({ ml = "8px" }) => `${ml}px`};

    :hover {
      background-color: ${({ level = 1 }) =>
        `${mappingLevel[level].backgroundHover}`};
    }
  }
  :disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: no-drop;
  }
`;
