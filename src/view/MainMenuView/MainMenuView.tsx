import { invoke } from '@tauri-apps/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { routes } from '..';
import { RouterButton } from '../../components/common/RouterButton';

interface IpcMessage {
  domain: string;
  action: {
    type: string;
    payload?: any;
  };
}

export const MainMenuView = () => {
  const [newName, setNewName] = useState<string>('');
  const [collectionId, setCollectionId] = useState<string>('');

  const sendMessage = async (message: IpcMessage): Promise<string> => {
    const response = await invoke<IpcMessage>('ipc_message', { message });
    console.log({ response });

    if (Array.isArray(response.action.payload)) {
      return Promise.resolve(response.action.payload[0].id);
    }

    return Promise.resolve(response.action.payload.id);
  };

  return (
    <div className="flex flex-column gap-3">
      <RouterButton label="Card View" to={routes.CardView} />
      <RouterButton label="Collection View" to={routes.CollectionView} />
      <Button
        label="Get All Collections"
        onClick={() =>
          sendMessage({
            domain: 'collection',
            action: {
              type: 'getAllCollections',
            },
          }).then((id) => {
            setCollectionId(id);
          })
        }
      />
      <Button
        label="Create Collection"
        onClick={() =>
          sendMessage({
            domain: 'collection',
            action: {
              type: 'createCollection',
              payload: {
                name: newName,
              },
            },
          })
        }
      />
      <InputText value={newName} onChange={(event) => setNewName(event.target.value)} />
      <Button
        label="Update Collection Name"
        onClick={() =>
          sendMessage({
            domain: 'collection',
            action: {
              type: 'updateCollection',
              payload: {
                id: collectionId,
                name: newName,
              },
            },
          })
        }
      />
      <Button
        label="Delete Collection"
        onClick={() =>
          sendMessage({
            domain: 'collection',
            action: {
              type: 'deleteCollection',
              payload: {
                id: collectionId,
              },
            },
          })
        }
      />
    </div>
  );
};
