import { z } from 'zod';

enum Frame {
  F1993 = '1993',
  F1997 = '1997',
  F2003 = '2003',
  F2015 = '2015',
  Future = 'future',
}

const FrameSchema = z.nativeEnum(Frame);

export { Frame, FrameSchema };
