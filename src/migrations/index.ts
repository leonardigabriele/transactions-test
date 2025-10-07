import * as migration_20251006_164100 from './20251006_164100';
import * as migration_20251006_170708 from './20251006_170708';
import * as migration_20251006_172602 from './20251006_172602';
import * as migration_20251007_112341 from './20251007_112341';

export const migrations = [
  {
    up: migration_20251006_164100.up,
    down: migration_20251006_164100.down,
    name: '20251006_164100',
  },
  {
    up: migration_20251006_170708.up,
    down: migration_20251006_170708.down,
    name: '20251006_170708',
  },
  {
    up: migration_20251006_172602.up,
    down: migration_20251006_172602.down,
    name: '20251006_172602',
  },
  {
    up: migration_20251007_112341.up,
    down: migration_20251007_112341.down,
    name: '20251007_112341'
  },
];
