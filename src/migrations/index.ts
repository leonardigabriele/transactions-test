import * as migration_20251006_164100 from './20251006_164100';

export const migrations = [
  {
    up: migration_20251006_164100.up,
    down: migration_20251006_164100.down,
    name: '20251006_164100'
  },
];
