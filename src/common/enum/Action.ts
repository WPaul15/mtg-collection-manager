export enum CollectionAction {
  CREATE = 'createCollection',
  GET_ALL = 'getAllCollections',
  UPDATE = 'updateCollection',
  DELETE = 'deleteCollection',
}

export type Action = `${CollectionAction}`;
