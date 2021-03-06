import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShowcasesService {

  constructor(
    private _http: HttpClient
  ) { }
  // getShowcases(){
  //   var showcaseTitlesDB = [];
  //   this._http.get('https://switchmagic.com:4111/api/showcaseTypes')
  //   .subscribe(showcaseTypes => { 
  //     showcaseTitlesDB = showcaseTypes['showcases'];
  //     localStorage.setItem('showcasetitles', showcaseTypes['showcases']);
  //     this.showcasesDb.next(showcaseTitlesDB);
  //    });
  // }
  showcasesObj: object = { showcaseTypesArray: [] };
  showcasesDb = new BehaviorSubject<object>(this.updateshowcasesDb());
  imageObjects = [];
  showcaseTypesArray = [];

  refreshshowcasesDb(imagesDB): void {
    this.imageObjects = [];
    this.showcaseTypesArray = [];
    //get types from imgDB
    this.imageObjects = imagesDB["imagesDB"];
    this.imageObjects.forEach(imgObj => {
      if (this.showcaseTypesArray.indexOf(imgObj.type) == -1) {
        this.showcaseTypesArray.push(imgObj.type);
      }
    });
    this.showcasesObj['showcaseTypesArray'] = [];
    let count = 0;
    this.showcaseTypesArray.forEach(showcaseName => {
      let nameUpper = showcaseName.toUpperCase();
      this.showcasesObj['showcaseTypesArray'].push(
        { value: count, viewValue: nameUpper }
      )
      count++;
    });
    localStorage.setItem('showcasetypes', JSON.stringify(this.showcasesObj['showcaseTypesArray']));
    this.showcasesDb.next(this.showcasesObj);
  }

  private updateshowcasesDb(): object {
    return this.showcasesObj;
  }
}
