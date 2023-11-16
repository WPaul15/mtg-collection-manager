import axios, { AxiosError } from 'axios';
import { createContext, PropsWithChildren, useContext } from 'react';
import {
  Card,
  CardSchema,
  ListSchema,
  ListType,
  Ruling,
  RulingSchema,
  ScryfallError,
  ScryfallErrorSchema,
  Set,
  SetSchema,
} from '../../schema';

interface ScryfallContextProps {
  searchCards: () => Promise<ListType<Card>>;
  getRulings: () => Promise<ListType<Ruling>>;
  getSet: () => Promise<Set>;
  getError: () => Promise<ScryfallError>;
}

const ScryfallContext = createContext<ScryfallContextProps>({} as ScryfallContextProps);

interface ScryfallProviderProps {}

export const ScryfallProvider = ({ children }: PropsWithChildren<ScryfallProviderProps>) => {
  const scryfallApi = axios.create({
    baseURL: 'https://api.scryfall.com',
  });

  const searchCards = async (): Promise<ListType<Card>> => {
    const res = await scryfallApi.get(`/cards/search?q=solphim`);
    return ListSchema(CardSchema).parse(res.data);
  };

  const getRulings = async (): Promise<ListType<Ruling>> => {
    const res = await scryfallApi.get('/cards/cma/176/rulings');
    return ListSchema(RulingSchema).parse(res.data);
  };

  const getSet = async (): Promise<Set> => {
    const res = await scryfallApi.get('/sets/aer');
    return SetSchema.parse(res.data);
  };

  const getError = async (): Promise<ScryfallError> => {
    const res = await scryfallApi.get('/cards/search?q=is%3Aslick+cmc%3Ecmc').catch((err: AxiosError) => {
      return err.response?.data;
    });
    return ScryfallErrorSchema.parse(res);
  };

  const value = {
    searchCards,
    getRulings,
    getSet,
    getError,
  };

  return <ScryfallContext.Provider value={value}>{children}</ScryfallContext.Provider>;
};

export const useScryfall = () => {
  return useContext(ScryfallContext);
};
