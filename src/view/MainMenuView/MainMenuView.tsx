import { invoke } from '@tauri-apps/api';
import { Button } from 'primereact/button';
import { routes } from '..';
import { RouterButton } from '../../components/common/RouterButton';

interface IpcMessage {
  domain: string;
  action: {
    type: string;
    payload: any;
  };
}

export const MainMenuView = () => {
  const sendMessage = async () => {
    const message: IpcMessage = {
      domain: 'card_collection',
      action: {
        type: 'createCollection',
        payload: {
          name: 'Test Collection',
        },
      },
    };
    const response = await invoke<IpcMessage>('ipc_message', { message });
    console.log({ response });
  };

  return (
    <div>
      <RouterButton label="Card View" to={routes.CardView} />
      <RouterButton label="Collection View" to={routes.CollectionView} />
      <Button label="DB Test" onClick={sendMessage} />
    </div>
  );
};
