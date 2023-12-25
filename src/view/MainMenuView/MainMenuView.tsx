import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { routes } from '..';
import { RouterButton } from '../../components/common/RouterButton';
import { useCollection } from '../../providers/CollectionProvider';

export const MainMenuView = () => {
  const [newName, setNewName] = useState<string>('');
  const [collectionId, setCollectionId] = useState<string>('');
  const { createCollection, updateCollection, deleteCollection } = useCollection();

  return (
    <div className="flex flex-column gap-3">
      <RouterButton label="Card View" to={routes.CardView} />
      <RouterButton label="Collection View" to={routes.CollectionView} />
      <Button label="Create Collection" onClick={() => createCollection({ name: newName })} />
      <InputText value={newName} onChange={(event) => setNewName(event.target.value)} />{' '}
      <Button
        label="Update Collection Name"
        onClick={() =>
          updateCollection({
            id: collectionId,
            name: newName,
          })
        }
      />
      <Button label="Delete Collection" onClick={() => deleteCollection({ id: collectionId })} />
    </div>
  );
};
