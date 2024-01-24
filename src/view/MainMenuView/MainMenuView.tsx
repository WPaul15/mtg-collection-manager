import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { routes } from '..';
import { CollectionDto } from '../../bindings/CollectionDto';
import { RouterButton } from '../../components/common/RouterButton';
import { useCollection } from '../../providers/CollectionProvider';

export const MainMenuView = () => {
  const [newName, setNewName] = useState<string>('');
  const [options, setOptions] = useState<CollectionDto[]>([]);
  const { collections, activeCollection, setActiveCollection, createCollection, updateCollection, deleteCollection } =
    useCollection();

  useEffect(() => {
    setOptions(Object.values(collections).sort((a, b) => a.name.localeCompare(b.name)));
  }, [collections]);

  return (
    <div className="flex flex-column gap-3">
      <Dropdown
        value={activeCollection}
        onChange={(e) => setActiveCollection(e.value)}
        options={options}
        optionLabel="name"
        placeholder="Select a collection"
      />
      <RouterButton label="Card View" to={routes.CardView} />
      <RouterButton label="Collection View" to={routes.CollectionView} />
      <Button label="Create Collection" onClick={() => createCollection({ name: newName })} />
      <InputText value={newName} onChange={(event) => setNewName(event.target.value)} />{' '}
      <Button
        label="Update Collection Name"
        onClick={() => {
          if (activeCollection) {
            updateCollection({
              id: activeCollection.id,
              name: newName,
            });
          }
        }}
      />
      <Button
        label="Delete Collection"
        onClick={() => {
          if (activeCollection) {
            deleteCollection({ id: activeCollection.id });
          }
        }}
      />
    </div>
  );
};
