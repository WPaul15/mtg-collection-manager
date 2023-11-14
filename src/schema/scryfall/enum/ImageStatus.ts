import { z } from 'zod';

enum ImageStatus {
  HighRes = 'highres_scan',
  LowRes = 'lowres',
  Placeholder = 'placeholder',
  Missing = 'missing',
}

const ImageStatusSchema = z.nativeEnum(ImageStatus);

export { ImageStatus, ImageStatusSchema };
