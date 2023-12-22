import { CollectionDto } from '../../bindings/CollectionDto';
import { CreateCollectionDto } from '../../bindings/CreateCollectionDto';
import { DeleteCollectionDto } from '../../bindings/DeleteCollectionDto';
import { CollectionAction } from '../../common/enum/Action';
import { Domain } from '../../common/enum/Domain';
import { useIpc } from '../useIpc';

export const useCollection = () => {
  const { sendMessage } = useIpc();

  const createCollection = async (payload: CreateCollectionDto) => {
    return await sendMessage({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.CREATE,
        payload,
      },
    });
  };

  const getAllCollections = async () => {
    return await sendMessage({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.GET_ALL,
      },
    });
  };

  const updateCollection = async (payload: CollectionDto) => {
    return await sendMessage({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.UPDATE,
        payload,
      },
    });
  };

  const deleteCollection = async (payload: DeleteCollectionDto) => {
    return await sendMessage({
      domain: Domain.Collection,
      action: {
        type: CollectionAction.DELETE,
        payload,
      },
    });
  };

  return { createCollection, getAllCollections, updateCollection, deleteCollection };
};
