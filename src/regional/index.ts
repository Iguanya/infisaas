import { Fyo } from 'fyo';
import { createKenyanRecords } from './ke/ke';  // 👈 Ensure correct import

export async function createRegionalRecords(country: string, fyo: Fyo) {
  console.log(`✅ Running createRegionalRecords for country: ${country}`);

  try {
    if (country === 'Kenya') {
      await createKenyanRecords(fyo);
    } else {
      console.warn(`⚠️ No regional configuration found for country: ${country}`);
    }
  } catch (error) {
    console.error(`🚨 Error in createRegionalRecords:`, error);
  }

  return;
}
