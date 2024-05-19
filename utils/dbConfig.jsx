import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
// const sql = neon(process.env.DATABASE_URL);
const sql = neon('postgresql://moneymanager_owner:WoATLKknY4Q8@ep-bitter-rain-a13vv0pp.ap-southeast-1.aws.neon.tech/moneymanager?sslmode=require');
export const db = drizzle(sql, {schema});