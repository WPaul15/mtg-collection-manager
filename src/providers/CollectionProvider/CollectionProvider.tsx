import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { CollectionDto } from '../../bindings/CollectionDto';
import { CreateCollectionDto } from '../../bindings/CreateCollectionDto';
import { DeleteCollectionDto } from '../../bindings/DeleteCollectionDto';
import { CollectionAction } from '../../common/enum/Action';
import { Domain } from '../../common/enum/Domain';
import { useIpc } from '../../hooks/useIpc';

interface CollectionState {
  collections: string[];
  activeCollection: string;
  setActiveCollection: Dispatch<SetStateAction<string>>;
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
  const [collections, setCollections] = useState<string[]>([]);
  const [activeCollection, setActiveCollection] = useState<string>('');

  const { sendMessage } = useIpc();

  const createCollection = async (payload: CreateCollectionDto) => {
    return await sendMessage<CreateCollectionDto, CollectionDto>({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.CREATE,
        payload,
      },
    });
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
    return await sendMessage<CollectionDto, CollectionDto>({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.UPDATE,
        payload,
      },
    });
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
    getAllCollections().then((res) => {
      setCollections(res.map((c) => c.id));
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
