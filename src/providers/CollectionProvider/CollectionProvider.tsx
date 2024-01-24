import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { CollectionDto } from '../../bindings/CollectionDto';
import { CreateCollectionDto } from '../../bindings/CreateCollectionDto';
import { DeleteCollectionDto } from '../../bindings/DeleteCollectionDto';
import { CollectionAction } from '../../common/enum/Action';
import { Domain } from '../../common/enum/Domain';
import { useTauriCommand } from '../../hooks/useTauriCommand';

interface CollectionState {
  collections: {
    [key: string]: CollectionDto;
  };
  activeCollection?: CollectionDto;
  setActiveCollection: Dispatch<SetStateAction<CollectionDto | undefined>>;
  createCollection: (payload: CreateCollectionDto) => Promise<CollectionDto>;
  getAllCollections: () => Promise<CollectionDto[]>;
  updateCollection: (payload: CollectionDto) => Promise<CollectionDto>;
  deleteCollection: (payload: DeleteCollectionDto) => Promise<CollectionDto>;
}

const CollectionContext = createContext<CollectionState>({} as CollectionState);

export const useCollection = () => {
  return useContext(CollectionContext);
};

interface CollectionProviderProps {}

export const CollectionProvider = ({ children }: PropsWithChildren<CollectionProviderProps>) => {
  const [collections, setCollections] = useState<{ [key: string]: CollectionDto }>({});
  const [activeCollection, setActiveCollection] = useState<CollectionDto>();

  const { sendMessage } = useTauriCommand();

  const createCollection = async (payload: CreateCollectionDto) => {
    const newCollection = await sendMessage<CreateCollectionDto, CollectionDto>({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.CREATE,
        payload,
      },
    });

    setCollections((c) => {
      c[newCollection.id] = newCollection;
      return c;
    });

    return newCollection;
  };

  const getAllCollections = async () => {
    return await sendMessage<undefined, CollectionDto[]>({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.GET_ALL,
      },
    });
  };

  const updateCollection = async (payload: CollectionDto) => {
    const updatedCollection = await sendMessage<CollectionDto, CollectionDto>({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.UPDATE,
        payload,
      },
    });

    setCollections((c) => {
      c[updatedCollection.id] = updatedCollection;
      return c;
    });

    return updatedCollection;
  };

  const deleteCollection = async (payload: DeleteCollectionDto) => {
    return await sendMessage<DeleteCollectionDto, CollectionDto>({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.DELETE,
        payload,
      },
    });
  };

  useEffect(() => {
    getAllCollections().then((collections) => {
      const records: { [key: string]: CollectionDto } = {};

      collections.forEach((collection) => {
        records[collection.id] = collection;
      });

      setCollections(records);
    });
  }, []);

  const value: CollectionState = {
    collections,
    activeCollection,
    setActiveCollection,
    createCollection,
    getAllCollections,
    updateCollection,
    deleteCollection,
  };

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};
