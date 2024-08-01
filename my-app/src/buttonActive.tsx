import React from 'react';
import './styles/buttonActive.css';

interface ButtonWithActionProps {
  text: string;
  onClick?: () => void;
  anchor?: string;
  active: boolean;
  type?: 'button' | 'submit' | 'reset'; // Добавили пропс type
}

const ButtonWithAction: React.FC<ButtonWithActionProps> = ({ text, onClick, anchor, active, type = 'button' }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type !== 'submit') { // предотвращаем действие только если тип не submit
      e.preventDefault();
    }

    if (anchor) {
      const targetElement = document.getElementById(anchor);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type} // Устанавливаем тип кнопки
      className={`custom-button ${active ? 'active' : 'inactive'}`}
      onClick={handleClick}
      disabled={!active}
    >
      {text}
    </button>
  );
};

export default ButtonWithAction;
