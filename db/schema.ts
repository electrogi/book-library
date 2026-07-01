import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: text("isbn").unique(),
  publishedYear: integer("published_year"),
  publisher: text("publisher"),
  genre: text("genre"),
  language: text("language").default("English"),
  pageCount: integer("page_count"),
  shelfLocation: text("shelf_location"),
  status: text("status").default("unread"), // 'unread' | 'reading' | 'read'
  notes: text("notes"),
  coverUrl: text("cover_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
});