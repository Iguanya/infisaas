import { Doc } from 'fyo/model/doc';
import { ListViewSettings } from 'fyo/model/types';

export class Tax extends Doc {
  static getListViewSettings(): ListViewSettings {
    return { columns: ['name', 'rate', 'type'] };
  }

  static defaultTaxes = [
    {
      name: 'VAT-16',
      rate: 16,
      type: 'Sales Tax',
      country: 'KE',
      account: 'VAT Payable'
    }
  ];
}
