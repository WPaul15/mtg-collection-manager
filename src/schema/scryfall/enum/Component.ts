import { z } from 'zod';

enum Component {
  Token = 'token',
  MeldPart = 'meld_part',
  MeldResult = 'meld_result',
  ComboPiece = 'combo_piece',
}

const ComponentSchema = z.nativeEnum(Component);

export { Component, ComponentSchema };
