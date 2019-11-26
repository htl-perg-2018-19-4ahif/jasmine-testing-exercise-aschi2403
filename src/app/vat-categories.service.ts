import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    // REPLACE the next line with the necessary code
    switch(category){
      case VatCategory.Food: return 20;
      case VatCategory.Drinks: return 10;
      default: return NaN;
    }
  }
}
