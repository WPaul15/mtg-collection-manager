import { Button, ButtonProps } from 'primereact/button';
import { RouteObject, useNavigate } from 'react-router-dom';

interface RouterButtonProps {
  to: RouteObject;
}

export const RouterButton = ({ to, label, ...props }: RouterButtonProps & ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      {...props}
      label={label}
      onClick={() => {
        navigate(to.path || '');
      }}
    />
  );
};
