import { FormulaMap, ListsMap } from 'fyo/model/types';
import { Address as BaseAddress } from 'models/baseModels/Address/Address';
import { codeCountyMap } from 'regional/ke';

export class Address extends BaseAddress {
  formulas: FormulaMap = {
    addressDisplay: {
      formula: () => {
        return [
          this.addressLine1,
          this.addressLine2,
          this.city,
          this.county,
          this.country,
          this.postalCode,
        ]
          .filter(Boolean)
          .join(', ');
      },
      dependsOn: [
        'addressLine1',
        'addressLine2',
        'city',
        'county',
        'country',
        'postalCode',
      ],
    },

    pos: {
      formula: () => {
        const countyList = Object.values(codeCountyMap).sort();
        const county = this.county as string;
        if (countyList.includes(county)) {
          return county;
        }
        return '';
      },
      dependsOn: ['county'],
    },
  };

  static lists: ListsMap = {
    ...BaseAddress.lists,
    pos: () => {
      return Object.values(codeCountyMap).sort();
    },
  };
}
