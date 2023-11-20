import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import { ZodTypeAny } from 'zod';
import * as symbology from '../../data/symbology.json';
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
import { CardCollectionRequest, CardQueryRequest } from '../../types/request';

interface SymbolMapValue extends CardSymbol {
  className: string;
}

interface SymbolMap {
  [key: string]: SymbolMapValue;
}

interface ScryfallContextProps {
  getCardsByQuery: (query: CardQueryRequest) => Promise<List<Card>>;
  getCardsByCollection: (body: CardCollectionRequest) => Promise<List<Card>>;
  getRulings: () => Promise<List<Ruling>>;
  getSet: () => Promise<Set>;
  getError: () => Promise<ScryfallError>;
  parseMana: (cost: string) => Promise<ManaCost>;
  replaceSymbols: (s: string | null | undefined) => ReturnType<typeof reactStringReplace>;
}

const ScryfallContext = createContext<ScryfallContextProps>({} as ScryfallContextProps);

interface ScryfallProviderProps {}

export const ScryfallProvider = ({ children }: PropsWithChildren<ScryfallProviderProps>) => {
  const [cardSymbols, setCardSymbols] = useState<SymbolMap>({});

  const scryfallApi = axios.create({
    baseURL: 'https://api.scryfall.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const request = async <T extends ZodTypeAny>(schema: T, config: AxiosRequestConfig<any>): Promise<any> => {
    try {
      const res = await scryfallApi.request({ ...config, method: config.method || 'GET' });
      return schema.parse(res.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        return ScryfallErrorSchema.parse(err.response?.data);
      }

      console.error({ err });
    }
  };

  const getAllCardSymbols = (): Promise<List<CardSymbol>> => {
    return Promise.resolve(ListSchema(CardSymbolSchema).parse(symbology));
  };

  useEffect(() => {
    getAllCardSymbols().then((symbols) => {
      const map: SymbolMap = {};
      symbols.data.forEach((symbol) => {
        const className =
          symbol.svgUri
            ?.substring(symbol.svgUri?.lastIndexOf('/') + 1)
            .replace(/\.svg/, '')
            .toLocaleLowerCase() || '';

        map[`${symbol.symbol}`] = { ...symbol, className };
      });

      setCardSymbols(map);
    });
  }, []);

  const getCardsByQuery = ({ ...query }: CardQueryRequest): Promise<List<Card>> => {
    return request(ListSchema(CardSchema), {
      url: '/cards/search',
      params: { ...query },
    });
  };

  const getCardsByCollection = ({ ...body }: CardCollectionRequest): Promise<List<Card>> => {
    return request(ListSchema(CardSchema), {
      method: 'POST',
      url: '/card/collection',
      data: {
        ...body,
      },
    });
  };

  const getRulings = (): Promise<List<Ruling>> => {
    return request(ListSchema(RulingSchema), { url: '/cards/cma/176/rulings' });
  };

  const getSet = (): Promise<Set> => {
    return request(SetSchema, { url: '/sets/aer' });
  };

  const getError = (): Promise<ScryfallError> => {
    return request(ListSchema(CardSchema), { url: '/cards/search?q=is%3Aslick+cmc%3Ecmc' });
  };

  const parseMana = (cost: string): Promise<ManaCost> => {
    return request(ManaCostSchema, {
      url: '/symbology/parse-mana',
      params: {
        cost,
      },
    });
  };

  const replaceSymbols = (s: string | null | undefined): ReturnType<typeof reactStringReplace> => {
    if (!s) {
      return [];
    }

    return reactStringReplace(s, /(\{[^}]+\})/g, (match, i) => {
      const symbol = cardSymbols[match];

      return (
        <abbr
          key={i}
          title={symbol.english}
          aria-label={symbol.english}
          className={`card-symbol card-symbol-${symbol.className} overflow-hidden`}
        >
          {match}
        </abbr>
      );
    });
  };

  const value = {
    getCardsByQuery,
    getCardsByCollection,
    getRulings,
    getSet,
    getError,
    parseMana,
    replaceSymbols,
  };

  return <ScryfallContext.Provider value={value}>{children}</ScryfallContext.Provider>;
};

export const useScryfall = () => {
  return useContext(ScryfallContext);
};
