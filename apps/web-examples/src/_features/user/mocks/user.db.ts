import { primaryKey } from '@mswjs/data';
import type { FactoryAPI } from '@mswjs/data/lib/glossary';
import { faker } from '@faker-js/faker';

export const userEntity = {
  id: primaryKey(Number),
  name: String,
  phone: String,
  email: String,
  createdAt: Date,
};

export function initializeMockUsers(db: FactoryAPI<{ user: typeof userEntity }>) {
  [...Array(3_000)].map((_, i) => {
    return db.user.create({
      id: i + 1,
      name: faker.lorem.words(2),
      phone: `010-${faker.number.int({
        min: 1000,
        max: 9999,
      })}-${faker.number.int({ min: 1000, max: 9999 })}`,
      email: faker.internet.email(),
      createdAt: faker.date.between({ from: '2024-01-01', to: '2025-01-01' }).toISOString(),
    });
  });
}
