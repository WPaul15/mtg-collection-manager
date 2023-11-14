import { z } from 'zod';

enum ImageFormat {
  Png = 'png',
  BorderCrop = 'border_crop',
  ArtCrop = 'art_crop',
  Large = 'large',
  Normal = 'normal',
  Small = 'small',
}

const ImageFormatSchema = z.nativeEnum(ImageFormat);

export { ImageFormat, ImageFormatSchema };
