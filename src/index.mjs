import * as keywords from "./keyword.mjs"
import * as priority from "./priority.mjs"
import * as cmd from "./cmd.mjs"
import {callbackify} from "util"
import * as Bot from "qq-official-bot"

await priority.initPriority();
await keywords.initKeyword();


const bot = new Bot.Bot({
	// 在这里配置你的 QQ 机器人的appid和secret等信息
    appid: '你的 appid',
    secret: '你的 secret',
    intents:[ // 监听事件类型
        'GROUP_AT_MESSAGE_CREATE', // 群聊@消息事件 没有群权限请注释
        'GROUP_MESSAGE_CREATE',
	    // 'C2C_MESSAGE_CREATE', // 私聊事件 没有私聊权限请注释
	    // 'GUILD_MESSAGES', // 私域机器人频道消息事件 公域机器人请注释
	    // 'PUBLIC_GUILD_MESSAGES', // 公域机器人频道消息事件 私域机器人请注释
	    // 'DIRECT_MESSAGE', // 频道私信事件
	    // 'GUILD_MESSAGE_REACTIONS', // 频道消息表态事件
	    // 'GUILDS', // 频道变更事件
	    // 'GUILD_MEMBERS', // 频道成员变更事件
	    // 'DIRECT_MESSAGE', // 频道私信事件
    ]
});


// 监听消息事件
bot.on('message', (event) => {
	// 在这里处理消息
	console.log('收到消息:', event.message);

	// 回复消息
	const fn = callbackify(cmd.matchCmd);
    const res = fn(1, event.message[0].text);
	event.reply(res);
});

// 启动机器人
bot.start();
