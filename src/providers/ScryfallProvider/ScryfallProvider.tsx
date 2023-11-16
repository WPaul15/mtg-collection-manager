import axios, { AxiosError } from 'axios';
import { createContext, PropsWithChildren, useContext } from 'react';
import { ZodTypeAny } from 'zod';
import {
  Card,
  CardSchema,
  CardSymbol,
  CardSymbolSchema,
  List,
  ListSchema,
  Ruling,
  RulingSchema,
  ScryfallError,
  ScryfallErrorSchema,
  Set,
  SetSchema,
} from '../../schema';

interface ScryfallContextProps {
  searchCards: () => Promise<List<Card>>;
  getRulings: () => Promise<List<Ruling>>;
  getSet: () => Promise<Set>;
  getError: () => Promise<ScryfallError>;
  getAllCardSymbols: () => Promise<List<CardSymbol>>;
}

const ScryfallContext = createContext<ScryfallContextProps>({} as ScryfallContextProps);

interface ScryfallProviderProps {}

export const ScryfallProvider = ({ children }: PropsWithChildren<ScryfallProviderProps>) => {
  const scryfallApi = axios.create({
    baseURL: 'https://api.scryfall.com',
  });

  const get = <T extends ZodTypeAny>(endpoint: string, schema: T): Promise<any> => {
    return scryfallApi
      .get(endpoint)
      .then((res) => {
        return schema.parse(res.data);
      })
      .catch((err: AxiosError) => {
        return ScryfallErrorSchema.parse(err.response?.data);
      });
  };

  const searchCards = async (): Promise<List<Card>> => {
    return get('/cards/search?q=solphim', ListSchema(CardSchema));
  };

  const getRulings = async (): Promise<List<Ruling>> => {
    return get('/cards/cma/176/rulings', ListSchema(RulingSchema));
  };

  const getSet = async (): Promise<Set> => {
    return get('/sets/aer', SetSchema);
  };

  const getError = async (): Promise<ScryfallError> => {
    return get('/cards/search?q=is%3Aslick+cmc%3Ecmc', ListSchema(CardSchema));
  };

  const getAllCardSymbols = async (): Promise<List<CardSymbol>> => {
    const res = await scryfallApi.get('/symbology');
    return ListSchema(CardSymbolSchema).parse(res.data);
  };

  const value = {
    searchCards,
    getRulings,
    getSet,
    getError,
    getAllCardSymbols,
  };

  return <ScryfallContext.Provider value={value}>{children}</ScryfallContext.Provider>;
};

export const useScryfall = () => {
  return useContext(ScryfallContext);
};
