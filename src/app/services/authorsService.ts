import { fetcher } from "@/services/http";

export interface Editorial {
  id: number;
  name: string;
}
export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string; 
  description: string;
  editorial: Editorial; 
}
export interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
}

export const fetchAuthors = (): Promise<Author[]> => {
  return fetcher<Author[]>("api/authors");
};