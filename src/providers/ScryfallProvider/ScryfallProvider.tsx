import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { PropsWithChildren, createContext, useContext } from 'react';
import { ZodTypeAny } from 'zod';
import {
  Card,
  CardSchema,
  CardSymbol,
  CardSymbolSchema,
  List,
  ListSchema,
  ManaCost,
  ManaCostSchema,
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
  parseMana: (cost: string) => Promise<ManaCost>;
}

const ScryfallContext = createContext<ScryfallContextProps>({} as ScryfallContextProps);

interface ScryfallProviderProps {}

export const ScryfallProvider = ({ children }: PropsWithChildren<ScryfallProviderProps>) => {
  const scryfallApi = axios.create({
    baseURL: 'https://api.scryfall.com',
  });

  const get = async <T extends ZodTypeAny>(
    schema: T,
    endpoint: string,
    config?: AxiosRequestConfig<any>
  ): Promise<any> => {
    try {
      const res = await scryfallApi.get(endpoint, config);
      return schema.parse(res.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        return ScryfallErrorSchema.parse(err.response?.data);
      }

      console.error({ err });
    }
  };

  const searchCards = (): Promise<List<Card>> => {
    return get(ListSchema(CardSchema), '/cards/search', {
      params: {
        q: 'solphim',
      },
    });
  };

  const getRulings = (): Promise<List<Ruling>> => {
    return get(ListSchema(RulingSchema), '/cards/cma/176/rulings');
  };

  const getSet = (): Promise<Set> => {
    return get(SetSchema, '/sets/aer');
  };

  const getError = (): Promise<ScryfallError> => {
    return get(ListSchema(CardSchema), '/cards/search?q=is%3Aslick+cmc%3Ecmc');
  };

  const getAllCardSymbols = (): Promise<List<CardSymbol>> => {
    return get(ListSchema(CardSymbolSchema), '/symbology');
  };

  const parseMana = (cost: string): Promise<ManaCost> => {
    return get(ManaCostSchema, '/symbology/parse-mana', {
      params: {
        cost,
      },
    });
  };

  const value = {
    searchCards,
    getRulings,
    getSet,
    getError,
    getAllCardSymbols,
    parseMana,
  };

  return <ScryfallContext.Provider value={value}>{children}</ScryfallContext.Provider>;
};

export const useScryfall = () => {
  return useContext(ScryfallContext);
};
