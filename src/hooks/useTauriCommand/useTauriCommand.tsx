import { invoke } from '@tauri-apps/api';
import { Action } from '../../common/enum/Action';
import { Domain } from '../../common/enum/Domain';

interface IpcMessage<T> {
  domain: Domain;
  action: {
    type: Action;
    payload?: T;
  };
}

export const useTauriCommand = () => {
  const closeSplashScreen = async () => {
    await invoke('close_splash_screen');
  };

  const sendMessage = async <T, R>(message: IpcMessage<T>): Promise<R> => {
    const response = await invoke<IpcMessage<T>>('ipc_message', {
      message,
    });

    return Promise.resolve<R>(response.action.payload as R);
  };

  return { closeSplashScreen, sendMessage };
};
