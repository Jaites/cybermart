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

  getBooks() : Observable<Book[]>{
    return this.http.get<IBook>(this.baseUrl).pipe(
      map(response => response._embedded.books) 
    );
  }
}

interface IBook{
  _embedded: {
    books: Book[];
  }
}
