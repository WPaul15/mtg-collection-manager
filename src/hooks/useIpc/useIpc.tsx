import { invoke } from '@tauri-apps/api';
import { Action } from '../../common/enum/Action';
import { Domain } from '../../common/enum/Domain';

interface IpcMessage {
  domain: Domain;
  action: {
    type: Action;
    payload?: any;
  };
}

export const useIpc = () => {
  const sendMessage = async (message: IpcMessage): Promise<string> => {
    const response = await invoke<IpcMessage>('ipc_message', {
      message,
    });
    console.log({ response });

    if (Array.isArray(response.action.payload)) {
      return Promise.resolve(response.action.payload[0].id);
    }

    return Promise.resolve(response.action.payload.id);
  };

  return { sendMessage };
};
