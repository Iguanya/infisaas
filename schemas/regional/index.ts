import { SchemaStub } from 'schemas/types';
import IndianSchemas from './in';
import SwissSchemas from './ch';
import KenyaSchemas from './ke';  // Add Kenya

/**
 * Regional Schemas are exported by country code.
 */
export default { 
  in: IndianSchemas, 
  ch: SwissSchemas, 
  ke: KenyaSchemas  // Register Kenya schemas
} as Record<string, SchemaStub[]>;
