import { Divider } from 'primereact/divider';

export const CardView = () => {
  return (
    <div className="flex justify-content-center">
      <div className="flex-grow-1">
        <p>Test</p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-grow-1">
        <p>Test</p>
      </div>
    </div>
  );
};
