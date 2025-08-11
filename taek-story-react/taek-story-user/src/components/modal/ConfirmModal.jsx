"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  selectConfirmModalOpen,
  selectConfirmModalMsg,
} from "/src/store/modalSlice.js";
import { useSelector } from "react-redux";
import { resolveConfirm } from "/src/util/modals.js";

export function ConfirmModal() {
  const confirmModalOpen = useSelector(selectConfirmModalOpen);
  const confirmModalMsg = useSelector(selectConfirmModalMsg);

  return (
    <>
      {/* Trigger button is optional; control via Redux actions */}
      <Modal
        show={confirmModalOpen}
        size="md"
        onClose={() => resolveConfirm(undefined)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <FontAwesomeIcon
              className="mx-auto mb-4 text-4xl text-gray-400 dark:text-gray-200"
              icon={faCircleInfo}
            />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {confirmModalMsg || "확인이 필요한 작업입니다."}
            </h3>
            <div className="flex justify-center gap-4">
              <Button type="button" color="blue" onClick={() => resolveConfirm(true)}>
                Yes
              </Button>
              <Button type="button" color="alternative" onClick={() => resolveConfirm(false)}>
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ConfirmModal;
