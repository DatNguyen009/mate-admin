import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openModalConfirm,
  closeModal,
} from "redux-toolkit/slices/Modal/ModalSlice";

const useConfirmModal = callback => {
  const dispatch = useDispatch();
  const isConfirm = useSelector(state => state.Modal.isConfirm);

  useEffect(() => {
    onOke();
  }, [isConfirm]);

  const onOke = async () => {
    if (isConfirm) {
      if (callback) callback();
      dispatch(closeModal());
    }
  };

  const toggle = () => {
    dispatch(openModalConfirm());
  };

  return {
    toggle,
  };
};

export default useConfirmModal;
