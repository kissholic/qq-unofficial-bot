import exp from "constants";
import * as db from "./db.mjs";

export const initPriority = async () => {
    const res = await db.createTable(db.createPriorityTableQuery);
    return res;
};

export const defaultPriority = 0;

// SELECT * FROM priority WHERE user_id=${0};
export const searchPriority = async (user_id) => {
    const res = await db.queryTable({table: "priority", condition: "user_id="+user_id.toString()});
    return res;
};

export const insertPriority = async ({id, prio}) => {
    const data = {
        user_id : id,
        priority : prio
    };
    const res = await db.insertTable({table: "priority", object : data});
    return res;
};

export const modifyPriority = async ({id, prio}) => {
    const data = {user_id : id, priority: prio};
    const res = await db.modifyTable({table: "priority", object: data, cond: `user_id=${id}`});
    return res;
};

export const deletePriority = async (key) => {
    await db.deleteTable({table: "priority", condition: `user_id=${key}`});
}


export const checkPriority = async (user_id, prio) => {
    const exist = await searchPriority(user_id);
    if (exist.length == 0)
        return defaultPriority >= prio;

    return exist[0].user_id >= prio;
};

