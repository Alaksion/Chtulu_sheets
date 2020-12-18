import React from 'react';
import { Container } from './styles';

interface IToolTipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<IToolTipProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
