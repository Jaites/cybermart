import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { map } from "rxjs/operators"
import { Observable, from } from 'rxjs';
import { BookCategory } from '../common/book-category';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  
  private categoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private http: HttpClient) { }

 /*
  getBooks(theCategoryId:number) : Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getBooksList(searchUrl);
  } */

  getBooks(theCategoryId: number, currentPage: number, pageSize: number): Observable<IBook>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<IBook>(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.http.get<IBook>(searchUrl).pipe(map(response => response._embedded.books));
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number) : Observable<IBook>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<IBook>(searchUrl);
  }

  /*
  searchBooks(keyword: string) : Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBooksList(searchUrl);
  } */

  getBookCategories(): Observable<BookCategory[]>{    
    return this.http.get<IBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory) 
    );
  }

  getBookDetails(bookId: number) : Observable<Book>{
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.http.get<Book>(bookDetailsUrl);
  }

  /*
  getBooks() : Observable<Book[]>{
    return this.http.get<IBook>(this.baseUrl).pipe(
      map(response => response._embedded.books) 
    );
  } 
  
  getBooks(theCategoryId:number) : Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.http.get<IBook>(searchUrl).pipe(
      map(response => response._embedded.books) 
    );
  }   */
}

interface IBookCategory{
  _embedded: {
    bookCategory: BookCategory[];
  }
}

interface IBook{
  _embedded: {
    books: Book[];
  }, 

  page: {
    size: number,
    totalElements: number,
    totalPages: number,    
    number: number
  }
}
