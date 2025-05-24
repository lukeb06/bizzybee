import { useModal } from '../../context/Modal';

interface OpenModalButtonProps {
  modalComponent: JSX.Element | null;
  buttonText: React.ReactNode;
  onButtonClick?: () => void;
  onModalClose?: (() => void) | null;
}

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
}: OpenModalButtonProps) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    onButtonClick?.();
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}

export default OpenModalButton;
