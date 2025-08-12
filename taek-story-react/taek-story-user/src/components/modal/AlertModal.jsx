"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  selectAlertModalOpen,
  selectAlertModalMsg,
} from "/src/store/modalSlice.js";
import { resolveAlert } from "/src/util/modals.js";

export default function AlertModal() {
  const open = useSelector(selectAlertModalOpen);
  const msg = useSelector(selectAlertModalMsg);

  return (
    <Modal show={open} size="md" onClose={() => resolveAlert(undefined)} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <FontAwesomeIcon
            className="mx-auto mb-4 text-4xl text-gray-400 "
            icon={faCircleInfo}
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 ">
            {msg || "알림"}
          </h3>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              color="blue"
              onClick={() => resolveAlert(true)}
            >
              확인
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
