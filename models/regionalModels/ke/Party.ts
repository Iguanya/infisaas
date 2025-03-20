import { HiddenMap } from 'fyo/model/types';
import { Party as BaseParty } from 'models/baseModels/Party/Party';
import { KRAType } from './types';
import { PartyRole } from 'models/baseModels/Party/types';

export class Party extends BaseParty {
  kraPin?: string;
  role?: PartyRole;
  vatType?: KRAType;
  loyaltyProgram?: string;

  async beforeSync() {
    const kraPin = this.get('kraPin') as string | undefined;
    const vatType = this.get('vatType') as KRAType;

    if (kraPin && vatType !== 'Registered VAT') {
      this.kraPin = '';
    }
  }

  hidden: HiddenMap = {
    kraPin: () => (this.vatType as KRAType) !== 'Registered VAT',
    loyaltyProgram: () => {
      if (!this.fyo.singles.AccountingSettings?.enableLoyaltyProgram) {
        return true;
      }
      return this.role === 'Supplier';
    },
    loyaltyPoints: () => !this.loyaltyProgram || this.role === 'Supplier',
  };
}

