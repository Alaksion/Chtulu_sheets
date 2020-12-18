import { useField } from '@unform/core';
import { appColors } from 'globalStyles';
import React, {
  useCallback,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  ContainerStyle?: object;
}

const CustomInput: React.FC<inputProps> = ({
  ContainerStyle,
  name,
  icon: Icon,
  ...rest
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleFocusOut = useCallback(() => {
    setFocus(false);
    if (inputRef.current?.value) {
      setFilled(true);
      return;
    }
    setFilled(false);
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  return (
    <Container
      style={ContainerStyle}
      isError={!!error}
      isFilled={filled}
      isFocused={focus}
    >
      {Icon && <Icon size={25} />}

      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleFocusOut}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertTriangle size={20} color={appColors.error_red} />
        </Error>
      )}
    </Container>
  );
};

export default CustomInput;
