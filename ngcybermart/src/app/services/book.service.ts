import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { map } from "rxjs/operators"
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";

  constructor(private http: HttpClient) { }


  getBooks(theCategoryId:number) : Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.http.get<IBook>(searchUrl).pipe(
      map(response => response._embedded.books) 
    );
  }

  /*
  getBooks() : Observable<Book[]>{
    return this.http.get<IBook>(this.baseUrl).pipe(
      map(response => response._embedded.books) 
    );
  } */
}

interface IBook{
  _embedded: {
    books: Book[];
  }
}
