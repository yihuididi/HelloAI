import styles from './PopOver.module.css';
import { forwardRef, useEffect, useState } from 'react';
import type { ReactNode, RefObject } from "react";
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface Props {
  children: ReactNode;
  onClose: () => void;
  target: RefObject<HTMLDivElement | null>;
  position?: { top: number; left: number; };
}

const PopOver = forwardRef<HTMLDivElement, Props>(
  ({
    children,
    onClose,
    target,
    position = { top: 0, left: 0 }
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      requestAnimationFrame(() => setIsOpen(true));
    }, []);

    const handleClose = () => {
      setIsOpen(false);
      setTimeout(onClose, 200); // shorter than CSS duration for smooth transition
    };

    return target.current && createPortal(
      <div
        ref={ref}
        className={`${styles.popover} ${isOpen ? styles.open : styles.hidden}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`
        }}
      >
        <div className={styles.close}>
          <button onClick={handleClose}>
            <IoClose />
          </button>
        </div>
        {children}
      </div>,
      target.current
    );
  }
);

export default PopOver;