/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://moneymanager_owner:WoATLKknY4Q8@ep-bitter-rain-a13vv0pp.ap-southeast-1.aws.neon.tech/moneymanager?sslmode=require',
    }
};