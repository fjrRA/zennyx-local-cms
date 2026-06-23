// src/features/games/form/game-form.mapper.test-data.ts
import {
  createInitialGameFormState,
} from "./game-form.defaults";

import {
  toCreateGameInput,
} from "./game-form.mapper";

const state =
  createInitialGameFormState();

const input =
  toCreateGameInput(state);

console.log(input);