import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  apiUrl: String = "https://rickandmortyapi.com/api/character";

  constructor(private http: HttpClient) { }

  getCharactersPage(pageNumber: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${pageNumber}`);
  }

  getApiTotalPages() : Observable<Number>  {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(pageJson => Number(pageJson.info.pages))
    );
  }

  getCharacterById(characterId: Number) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${characterId}`);
  }
}
