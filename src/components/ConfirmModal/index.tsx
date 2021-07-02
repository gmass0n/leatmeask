import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
} from "@chakra-ui/react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Button } from "../Button";

import { ModalContent } from "./styles";

export interface ConfirmModalHandles {
  open(): void;
  close(): void;
}

interface ConfirmModalProps {
  onConfirm(): void;
  isConfirming?: boolean;
  title: string;
  confirmText: string;
  description: string;
  icon: string;
}

const ConfirmModalComponent: ForwardRefRenderFunction<
  ConfirmModalHandles,
  ConfirmModalProps
> = (
  { onConfirm, isConfirming = false, title, description, icon, confirmText },
  ref
) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  function open(): void {
    setIsConfirmModalOpen(true);
  }

  function close(): void {
    setIsConfirmModalOpen(false);
  }

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    []
  );

  return (
    <AlertDialog
      isOpen={isConfirmModalOpen}
      onClose={close}
      leastDestructiveRef={cancelRef}
      size="xl"
      motionPreset="slideInBottom"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <ModalContent>
            <img src={icon} alt="Icon of confirm modal" />

            <h1>{title}</h1>

            <p>{description}</p>

            <div>
              <Button ref={cancelRef} onClick={close}>
                Cancelar
              </Button>

              <Button
                variant="danger"
                onClick={onConfirm}
                isLoading={isConfirming}
              >
                {confirmText}
              </Button>
            </div>
          </ModalContent>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const ConfirmModal = forwardRef(ConfirmModalComponent);
