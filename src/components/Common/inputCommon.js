import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { Field } from "formik";
import { DropdownToggle, Input, Label } from "reactstrap";
import styled from "styled-components";
export const CommonField = styled(Field)`
  padding: 8px;
  background: var(--gray-100);
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  box-shadow: none;
  height: calc(1.5em + 0.75rem + 2px);
  :focus {
    background: var(--gray-100);
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%);
  }
  > .is-invalid {
    background: red;
  }
`;

export const CommonInputt = styled.input`
  padding: 8px;
  background: var(--gray-100);
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  box-shadow: none;
  height: calc(1.5em + 0.75rem + 2px);
  :focus {
    background: var(--gray-100);
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%);
  }
  > .is-invalid {
    background: red;
  }
  :disabled {
    background: var(--gray-100);
  }
`;

export const WrapperInputNumber = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--gray-100) !important;
  border: 1px solid #ced4da !important;
  box-shadow: none;
  border-radius: 0.25rem;
  padding: 1px;

  :focus-within {
    border: 1px solid #ced4da !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%) !important;
  }

  .ant-input-number {
    background: var(--gray-100);
    border: 1px solid #ced4da;
    box-shadow: none;
    border-left: none;
    border-right: none;
    border-radius: unset;

    :focus-within {
      background: var(--gray-100);
      border: 1px solid #ced4da;
      box-shadow: none;
      border-left: none;
      border-right: none;
      border-radius: unset;
    }

    .ant-input-number-handler-wrap {
      display: none;
    }
    .ant-input-number-input-wrap {
      width: 100%;
    }
  }

  .suffix {
    font-weight: 600;
    padding-right: 8px;
  }
`;

export const CommonInputNumber = styled(InputNumber)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--gray-100);
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  box-shadow: none;
  height: calc(1.5em + 0.75rem + 2px);
  > .is-invalid {
    background: red;
  }
  :disabled {
    background: var(--gray-100);
    opacity: 0.5;
    cursor: not-allowed;
  }
  .ant-input-number-input {
    height: inherit;
    padding: 0;
    :disabled {
      background: var(--gray-100);
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const CommonLabel = styled(Label)`
  margin-bottom: var(--margin-xs);
  font-size: 12px;
  font-weight: 400;
`;

export const CommonDataPicker = styled(DatePicker)`
  padding: 8px;
  background: var(--gray-100);
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border-radius: 0.25rem !important;
  box-shadow: none;
  outline: 0;
  border-color: #b9bfc4 !important;
  height: calc(1.5em + 0.75rem + 2px);
  border: "1px solid rgb(206, 212, 218)";
  color: "rgb(73, 80, 87)";
  background: "#f4f5f6";

  &:focus-within {
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%) !important;
  }

  :focus {
    border-color: #b9bfc4;
    border-width: 2px;
    background: var(--gray-100);
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%) !important;
  }

  :hover,
  :active {
    border-color: #b9bfc4;
    outline: 0;
  }
  > .is-invalid {
    background: red;
  }
`;
export const CommonDropdownToggle = styled(DropdownToggle)`
  background-color: var(--white);
  border-color: #f9fafa;
  box-shadow: var(--btn-shadow);
  color: var(--black);
  transition: all 0.2s ease;
  min-width: 38px;
  min-height: 38px;
  height: var(--btn-height);
  margin-left: var(--margin-sm, 8px);
  border-radius: var(--border-radius);
  font-size: var(--text-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  :hover,
  :active {
    background-color: var(--fg-color);
  }
`;

export const CommonSelect = styled.select`
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  border: 1px solid #ced4da;
  white-space: pre;
  padding: 8px;
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  box-shadow: none;
  width: 100%;
  min-width: 10rem;
  height: calc(1.5em + 0.75rem + 2px);
  background: var(--gray-100);
  :focus {
    background: var(--gray-100);
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%);
  }
  > .is-invalid {
    background: red;
  }
`;

export const CommonInput = styled(Input)`
  padding: 8px;
  background: var(--gray-100);
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  box-shadow: none;
  :focus {
    background: var(--gray-100);
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%);
  }
  > .is-invalid {
    background: red;
  }
`;
export const ComponentCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

export const LabelCheckbox = styled(CommonLabel)`
  margin: 0;
  padding-left: 6px;
`;

export const CommonTextarea = styled.textarea`
  padding: 8px;
  background: var(--gray-100);
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  box-shadow: none;
  :focus {
    background: var(--gray-100);
    box-shadow: 0 0 0 2px rgb(104 113 120 / 25%);
  }
  > .is-invalid {
    background: red;
  }
`;
