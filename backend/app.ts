import "dotenv/config";

import express from "express";
import {
    Client,
    Events,
    GatewayIntentBits,
    Presence,
    RichPresenceAssets,
} from "discord.js";
import { createServer } from "node:http";
import Activity from "./models/Activity";
import { Server } from "socket.io";
import cors from "cors";
import logger from "./logger";
import { quotes } from "./data/quotes";
import Quote from "./models/Quote";

const port = process.env.PORT;
const token = process.env.DISCORD_BOT_TOKEN;
const userId: string = process.env.USER_ID || "";
const rawgApiKey: string = process.env.RAWG_API_KEY || "";
const rawgBaseUrl: string = process.env.RAWG_BASE_URL || "";

const app = express();

const allowedOrigins = [
    "https://www.suprhulk.com",
    "https://portfolio-suprhulks-projects.vercel.app",
    "https://portfolio-git-main-suprhulks-projects.vercel.app",
    "http://localhost:4200",
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
}));

const server = createServer(app);

const rawgImageCache = new Map<string, string>();

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
    },
});

const defaultActivity: Activity = {
    name: "Sleeping",
    type: 6,
    details: "In bed",
    state: "Zzzz",
    imageUrl: process.env.DEFAULT_ACTIVITY_IMAGE_URL!,
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

async function pollUserPresence(): Promise<Activity | null> {
    let userPresence: Presence | null = null;

    for (const [_, guild] of client.guilds.cache) {
        const member = await guild.members.fetch(userId).catch(() => null);
        if (member?.presence) {
            userPresence = member.presence;
            break;
        }
    }

    if (userPresence != null && userPresence.activities.length != 0) {
        return await getActivity(userPresence);
    }

    return null;
}

async function getActivity(presence: Presence): Promise<Activity | null> {
    try {
        const curActivity = presence.activities[0];
        const name = curActivity.name;
        const type = curActivity.type;
        const details = curActivity.details;
        const state = curActivity.state;
        const imageUrl = await getUrl(name, curActivity.assets);

        const activity: Activity = {
            name,
            type,
            details,
            state,
            imageUrl,
        };

        return activity;
    } catch (err) {
        logger.error("Error in getActivity", { error: err });
        return null;
    }
}

async function getUrl(
    name: string,
    asset: RichPresenceAssets | null
): Promise<string> {
    try {
        if (asset === null || asset === undefined)
            return (
                (await getImageFromRawg(name)) ??
                process.env.NOT_FOUND_IMAGE_URL!
            );

        let imageUrl =
            asset.largeImage !== null
                ? asset.largeImageURL()
                : asset.smallImage !== null
                ? asset.smallImageURL()
                : null;

        if (!imageUrl) {
            imageUrl = await getImageFromRawg(name);
        }

        return imageUrl ?? process.env.NOT_FOUND_IMAGE_URL!;
    } catch (err) {
        logger.error("Error in getUrl", { error: err });
        return process.env.NOT_FOUND_IMAGE_URL!;
    }
}

async function getImageFromRawg(name: string): Promise<string | null> {
    try {
        const cacheImage = checkCache(name);

        if (cacheImage) {
            return cacheImage;
        }

        const apiRes = await fetch(
            rawgBaseUrl + "?key=" + rawgApiKey + "&search=" + name
        );
        const data = await apiRes.json();
        const res: any[] = data.results;

        if (!res.length || !res[0].background_image) {
            return null;
        }
        return res[0].background_image;
    } catch (err) {
        logger.error("Error in getImageFromRawg", { error: err });
        return null;
    }
}

function checkCache(name: string): string | undefined {
    return rawgImageCache.get(name);
}

client.once(Events.ClientReady, (readyClient) => {
    logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("presenceUpdate", async (_, newP: Presence | null) => {
    if (newP?.userId == userId) {
        if (newP.activities.length != 0) {
            const activity = await getActivity(newP);
            logger.info(activity);
            io.emit("activity", activity);
        } else {
            io.emit("activity", defaultActivity);
        }
    }
});

client.login(token);

io.on("connection", (socket) => {
    logger.info("Connection made: " + socket.id);
    socket.on("ready", async () => {
        let activity = await pollUserPresence();
        logger.info("sending to: " + socket.id, {
            activity: activity ?? defaultActivity,
        });
        socket.emit("activity", activity ?? defaultActivity);
    });
    socket.on("disconnect", () => {
        logger.info("Disconnected: " + socket.id);
    });
});

app.get("/getQuote", (req, res) => {
    const quote = selectQuote(quotes);
    logger.info("Selected quote:", { quote: quote });
    res.status(200).json(quote);
});

function selectQuote(data: any): Quote {
    const quote = data[Math.floor(Math.random() * data.length)];
    if (quote.text.length > 60) {
        return selectQuote(data);
    }
    return quote;
}

//health checkpoint
app.get("/", (_, res: any) => {
    res.status(200).send("OK");
});

server.listen(port, () => {
    logger.info("Listening on port: " + port);
});
