import { Fyo } from 'fyo';

export type TaxType = 'VAT' | 'Withholding-Tax' | 'Excise-Duty' | 'Exempt-VAT';

export async function createKenyanRecords(fyo: Fyo) {
  console.log(`✅ Running createKenyanRecords`);
  await createTaxes(fyo);
}

async function createTaxes(fyo: Fyo) {
  const taxes = {
    VAT: [16, 8, 0],
    'Withholding-Tax': [5, 10, 15],
    'Excise-Duty': [20, 10, 5],
    'Exempt-VAT': [0],
  };

  for (const type of Object.keys(taxes)) {
    for (const percent of taxes[type as TaxType]) {
      const taxName = `${type}-${percent}`;

      // ✅ Ensure the parent Tax exists first
      let taxRecord = await fyo.db.get('Tax', taxName);
      if (!taxRecord) {
        taxRecord = fyo.doc.getNewDoc('Tax', { name: taxName });
        await taxRecord.sync(); // 🔥 Insert Tax first
      }

      // ✅ Ensure TaxDetail is inserted only if Tax exists
      const taxDetail = fyo.doc.getNewDoc('TaxDetail', {
        parent: taxName, // Must exist in Tax table
        parentSchemaName: 'Tax', // Explicitly set parent schema
        parentFieldname: 'details', // Fieldname linking to parent
        account: getAccountName(type),
        rate: percent,
      });

      await taxDetail.sync();
    }
  }
}

function getAccountName(type: TaxType) {
  switch (type) {
    case 'VAT':
      return 'Output VAT';
    case 'Withholding-Tax':
      return 'Withholding Tax';
    case 'Excise-Duty':
      return 'Excise Duty';
    default:
      return type.replace('-', ' ');
  }
}
