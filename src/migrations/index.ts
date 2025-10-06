import * as migration_20251006_164100 from './20251006_164100';
import * as migration_20251006_170708 from './20251006_170708';

export const migrations = [
  {
    up: migration_20251006_164100.up,
    down: migration_20251006_164100.down,
    name: '20251006_164100',
  },
  {
    up: migration_20251006_170708.up,
    down: migration_20251006_170708.down,
    name: '20251006_170708'
  },
];
