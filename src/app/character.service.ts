import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './Models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<Character> {
  const randomId = Math.floor(Math.random() * 826) + 1;
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${randomId}`);
  }

}
