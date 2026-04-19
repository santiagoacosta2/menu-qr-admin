import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'crypto'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

function hashPassword(password: string): string {
  return hash('sha256', password)
}

async function main() {
  console.log('Starting seed...')

  const adminPassword = process.env.SEED_ADMIN_PASSWORD_1 || 'admin123'
  const hashedPassword = hashPassword(adminPassword)

  // Create admin user with DNI
  const adminDni = process.env.SEED_ADMIN_DNI_1 || '12345678'
  const admin = await prisma.user.upsert({
    where: { dni: adminDni },
    update: {},
    create: {
      dni: adminDni,
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log(`Admin user created: DNI ${admin.dni}`)

  // Create sample categories
  const categories = [
    { name: 'Bebidas Calientes', order: 1 },
    { name: 'Bebidas Frías', order: 2 },
    { name: 'Pasteles', order: 3 },
    { name: 'Sándwiches', order: 4 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.name }, // Using name as unique identifier for seed
      update: { order: cat.order },
      create: { name: cat.name, order: cat.order },
    })
  }

  console.log(`Created ${categories.length} categories`)

  // Create sample products
  const products = [
    { name: 'Café Americano', price: 3.50, categoryName: 'Bebidas Calientes', available: true, order: 1 },
    { name: 'Cappuccino', price: 4.50, categoryName: 'Bebidas Calientes', available: true, order: 2 },
    { name: 'Latte', price: 4.00, categoryName: 'Bebidas Calientes', available: true, order: 3 },
    { name: 'Té Verde', price: 3.00, categoryName: 'Bebidas Calientes', available: true, order: 4 },
    { name: 'Iced Latte', price: 4.50, categoryName: 'Bebidas Frías', available: true, order: 1 },
    { name: 'Frappuccino', price: 5.50, categoryName: 'Bebidas Frías', available: true, order: 2 },
    { name: 'Jugo de Naranja', price: 4.00, categoryName: 'Bebidas Frías', available: true, order: 3 },
    { name: 'Cheesecake', price: 6.00, categoryName: 'Pasteles', available: true, order: 1 },
    { name: 'Brownie', price: 4.50, categoryName: 'Pasteles', available: true, order: 2 },
    { name: 'Croissant', price: 3.50, categoryName: 'Pasteles', available: true, order: 3 },
    { name: 'Sándwich de Pollo', price: 8.00, categoryName: 'Sándwiches', available: true, order: 1 },
    { name: 'Club Sandwich', price: 9.50, categoryName: 'Sándwiches', available: true, order: 2 },
  ]

  for (const prod of products) {
    const category = await prisma.category.findFirst({
      where: { name: prod.categoryName },
    })

    if (category) {
      await prisma.product.upsert({
        where: { id: `${prod.name}-${category.id}` },
        update: {
          price: prod.price,
          available: prod.available,
          order: prod.order,
        },
        create: {
          id: `${prod.name}-${category.id}`,
          name: prod.name,
          price: prod.price,
          categoryId: category.id,
          available: prod.available,
          order: prod.order,
        },
      })
    }
  }

  console.log(`Created ${products.length} products`)

  console.log('\nSeed completed successfully!')
  console.log(`Admin login: DNI ${adminDni} / ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
