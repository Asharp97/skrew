import { PrismaClient } from '@prisma/client';
import cards from './data/cards';

const prisma = new PrismaClient();

async function seedDatabase(
  db: typeof prisma.card,
  items: any[],
  name: string,
) {
  await db.deleteMany();
  const status = await db.createMany({
    data: items.map((item) => ({
      ...item,
    })),
    skipDuplicates: true,
  });
  console.log(`${name} status: created ${status.count} ${name}s`);
  return status.count;
}

async function main() {
  await seedDatabase(prisma.card, cards, 'Card');
}

main()
  .then(async () => {
    console.log('Done.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
