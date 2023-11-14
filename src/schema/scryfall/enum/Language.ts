import { z } from 'zod';

enum Language {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  Portuguese = 'pt',
  Japanese = 'ja',
  Korean = 'ko',
  Russian = 'ru',
  ChineseSimplified = 'zhs',
  ChineseTraditional = 'zht',
  Hebrew = 'he',
  Latin = 'la',
  AncientGreek = 'grc',
  Arabic = 'ar',
  Sanskrit = 'sa',
  Phyrexian = 'ph',
}

const LanguageSchema = z.nativeEnum(Language);

export { Language, LanguageSchema };
