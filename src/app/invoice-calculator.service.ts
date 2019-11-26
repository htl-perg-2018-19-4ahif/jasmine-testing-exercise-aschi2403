import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    // REPLACE the next line with the necessary code
    return priceInclusiveVat / (100 + vatPercentage) * 100;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    // REPLACE the next line with the necessary code
    let invoice: Invoice = {
      invoiceLines: [],
      totalPriceInclusiveVat: 0,
      totalPriceExclusiveVat: 0,
      totalVat: 0
    }
    
    invoiceLines.forEach(element => {
      invoice.invoiceLines.push({
        product: element.product,
        vatCategory: element.vatCategory,
        priceInclusiveVat: element.priceInclusiveVat,
        priceExclusiveVat: this.CalculatePriceExclusiveVat(element.priceInclusiveVat, VatCategoriesService.getVat(element.vatCategory))
      });
      invoice.totalPriceExclusiveVat += this.CalculatePriceExclusiveVat(element.priceInclusiveVat, VatCategoriesService.getVat(element.vatCategory));
      invoice.totalPriceInclusiveVat += element.priceInclusiveVat;
      invoice.totalVat += invoice.totalPriceInclusiveVat - invoice.totalPriceExclusiveVat;
    });
    return invoice;
  }
}
