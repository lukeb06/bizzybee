import { useModal } from '../../context/Modal';

interface OpenModalButtonProps {
  modalComponent: JSX.Element | null;
  buttonText: React.ReactNode;
  onButtonClick?: () => void;
  onModalClose?: (() => void) | null;
  className?: string;
  icon?: React.ReactNode;
}

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  className,
  icon
}: OpenModalButtonProps) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    onButtonClick?.();
  };

  return <button onClick={handleClick} className={className}>{icon}{buttonText}</button>;
}

export default OpenModalButton;
