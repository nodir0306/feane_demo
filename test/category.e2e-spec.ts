import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';
import { Category, CategoryModule, Food } from '@modules';

describe('Category e2e', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let categoryId: number

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env.test"
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          models: [Category, Food],
          autoLoadModels: true,
          sync: {force: true},
          logging: false,
          synchronize: true,
        }),
        CategoryModule,
      ],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    sequelize = moduleRef.get<Sequelize>(Sequelize);
  });

  afterAll(async () => {
    await app.close();
    await sequelize.close();
  });

  // Create a new category
  it('/POST categories (Create Category)', async () => {
    const categoryData = {
      name: 'Technology',
    };

    const response = await request(app.getHttpServer())
      .post('/categories/add')
      .send(categoryData)
      .expect(201);

    const category = response.body;
    categoryId = category.id; // Store the category ID for later use
    expect(category.id).toBeDefined();
    expect(category.name).toEqual('Technology');
  });

  // Retrieve all categories
  it('/GET categories (Retrieve All Categories)', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    const categories = response.body;
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);  // Ensure at least one category is returned
    expect(categories[0].name).toEqual('Technology');
  });

  // Update a category by ID
  it('/PUT categories/edit/:id (Update Category)', async () => {
    const updatedCategoryData = {
      name: 'Updated Technology',
    };

    const response = await request(app.getHttpServer())
      .put(`/categories/edit/${categoryId}`)
      .send(updatedCategoryData)
      .expect(200);
  });

  // Delete a category by ID
  it('/DELETE categories/delete/:id (Delete Category)', async () => {
    await request(app.getHttpServer())
      .delete(`/categories/delete/${categoryId}`)
      .expect(200)
  });
});
