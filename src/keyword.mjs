import * as db from "./db.mjs";
import * as priority from "./priority.mjs"


export const initKeyword = async () => {
    const res = await db.createTable(db.createKeywordTableQuery);
    return res;
};

export const defaultKeywordModifyPriority = 0;

export const searchKeyword = async (key) => {
    const res = await db.queryTable({table: "keywords", condition: `keyword="${key}"`});
    if (res.length == 0)
        return `兔兔不懂${key}捏`;
    return res[0].description;
};


export const deleteKeyword = async (key, user_id) => {
    const allow = await priority.checkPriority(user_id, defaultKeywordModifyPriority);
    if (allow) {
        await db.deleteTable({table: "keywords", condition: `keyword="${key}"`});
    }
};


export const insertOrUpdateKeyword = async ({key, value, user_id}) => {
    const allow = await priority.checkPriority(user_id, defaultKeywordModifyPriority);
    if (allow) {
        const exist = await db.queryTable({table: "keywords", condition: `keyword="${key}"`});
        if (exist.length)
            await db.deleteTable({table: "keywords", condition: `keyword="${key}"`});
        await db.insertTable({table: "keywords", object: {keyword: key, description: value}});
    }
};
