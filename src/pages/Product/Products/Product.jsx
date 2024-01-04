import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import VVSTable from "components/form-control/VVSTable";
import { CommonButton } from "components/Common/ButtonCommon";
import httpService from "services/httpService";
const TableProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [barcodeTemplate, setBarcodeTemplate] = useState(null);

  const PrintBarcodeButton = props => {
    const { getValues, selectedRows } = props;

    const onClick = async () => {
      try {
        const url = "/parse/functions/print-barcode";
        const items = getValues("Product").filter((_, index) =>
          selectedRows.has(index)
        );
        const products = [];
        const variances = [];
        items.forEach(item => {
          products.push(item.objectId);
        });
        const postBarcodes = { products, variances };
        await httpService.post(url, postBarcodes);
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <CommonButton level={4} onClick={onClick}>
        In Barcode
      </CommonButton>
    );
  };
  PrintBarcodeButton.propTypes = {
    getValues: PropTypes.func,
    selectedRows: PropTypes.object,
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <VVSTable
            name="Product"
            title={"Hàng hóa"}
            helperButtons={[
              {
                component: PrintBarcodeButton,
                onlyInEditMode: true,
              },
            ]}
            showImportExcel
            whereQuery={{ isAllowedSaving: false }}
          />
        </Container>
      </div>
      <Modal size="lg" isOpen={isOpen} centered={true}>
        <ModalHeader style={{ textTransform: "capitalize" }}>
          Xem trước
        </ModalHeader>
        <ModalBody className="px-2">
          <div>{barcodeTemplate}</div>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => setIsOpen(false)}
            type="button"
          >
            Hủy
          </CommonButton>
          <CommonButton
            level={2}
            onClick={() => setIsOpen(false)}
            type="button"
          >
            In
          </CommonButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default TableProduct;
