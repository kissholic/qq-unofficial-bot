import * as keyword from "./keyword.mjs"


export const matchCmd = async (user_id, cmd) => {
    if (cmd.startsWith('/')) {
        cmd = cmd.substring(1);
    }
    
    if (cmd.startsWith('百科')) {
        const key = cmd.substring(2);
        const res = await keyword.searchKeyword(key);
        return res;
    }
    else if (cmd.startsWith('设置')) {
        const cmd1 = cmd.substring(2);
        if (cmd1.startsWith('权限')) {
            const cmd2 = cmd1.substring(2);
            const spacePos = cmd2.indexOf(' ');
            if (spacePos == -1)
                return "";

            // TODO: Set priority
        }
        else if (cmd1.startsWith('关键字')) {
            const cmd2 = cmd1.substring(3);
            const spacePos = cmd2.indexOf(' ');
            if (spacePos == -1) {
                return "设置失败";
            }

            const key = cmd2.substring(0, spacePos);
            const desc = cmd2.substring(spacePos + 1);
            await keyword.insertOrUpdateKeyword({key: key, value: desc, user_id: user_id});
            return "设置成功";
        }
    }

    return "";
};




