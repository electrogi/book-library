"use server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { getAuthFromCookie } from "@/lib/auth";
import { eq, ilike, and, sql, asc, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const payload = await getAuthFromCookie();
  return !!payload;
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
  if (!(await requireAuth())) return { error: "Unauthorized" };
  try {
    await db.insert(books).values(data);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create book" };
  }
}

export async function updateBook(id: number, data: Partial<BookInput>) {
  if (!(await requireAuth())) return { error: "Unauthorized" };
  try {
    await db.update(books).set(data).where(eq(books.id, id));
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update book" };
  }
}

export async function deleteBook(id: number) {
  if (!(await requireAuth())) return { error: "Unauthorized" };
  try {
    await db.delete(books).where(eq(books.id, id));
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete book" };
  }
}

export async function getBooks(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
  order?: "asc" | "desc";
}) {
  if (!(await requireAuth())) return { error: "Unauthorized", books: [], total: 0, page: params.page || 1, limit: params.limit || 20 };
  
  try {
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

    const where = conditions.length > 0 ? and(...conditions) : undefined;

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
  } catch (error: any) {
    return {
      error: error.message || "Failed to fetch books",
      books: [],
      total: 0,
      page: params.page || 1,
      limit: params.limit || 20,
    };
  }
}