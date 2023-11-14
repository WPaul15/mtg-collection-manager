import { z } from 'zod';

enum Layout {}

const LayoutSchema = z.nativeEnum(Layout);

export { Layout, LayoutSchema };
