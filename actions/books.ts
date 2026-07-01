"use server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { getAuthFromCookie } from "@/lib/auth";
import { eq, ilike, and, sql, asc, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const payload = await getAuthFromCookie();
  if (!payload) throw new Error("Unauthorized");
}

type BookInput = {
  title: string;
  author: string;
  isbn?: string;
  publishedYear?: number;
  publisher?: string;
  genre?: string;
  language?: string;
  pageCount?: number;
  shelfLocation?: string;
  status?: string;
  notes?: string;
  coverUrl?: string;
};

export async function createBook(data: BookInput) {
  await requireAuth();
  await db.insert(books).values(data);
  revalidatePath("/dashboard");
}

export async function updateBook(id: number, data: Partial<BookInput>) {
  await requireAuth();
  await db.update(books).set(data).where(eq(books.id, id));
  revalidatePath("/dashboard");
}

export async function deleteBook(id: number) {
  await requireAuth();
  await db.delete(books).where(eq(books.id, id));
  revalidatePath("/dashboard");
}

export async function getBooks(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
  order?: "asc" | "desc";
}) {
  await requireAuth();
  const { page = 1, limit = 20, search, status, sort = "created_at", order = "desc" } = params;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      sql`(${books.title} ILIKE ${'%' + search + '%'} OR ${books.author} ILIKE ${'%' + search + '%'})`
    );
  }
  if (status) {
    conditions.push(eq(books.status, status));
  }

  const where = and(...conditions);

  const sortColumn = sort === "title" ? books.title : sort === "author" ? books.author : books.createdAt;
  const orderBy = order === "asc" ? asc(sortColumn) : desc(sortColumn);

  const [result, countResult] = await Promise.all([
    db.select().from(books).where(where).limit(limit).offset(offset).orderBy(orderBy),
    db.select({ count: sql<number>`count(*)` }).from(books).where(where),
  ]);

  return {
    books: result,
    total: countResult[0].count,
    page,
    limit,
  };
}