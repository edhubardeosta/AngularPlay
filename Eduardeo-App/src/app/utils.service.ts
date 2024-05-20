import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

}
