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
import { Server, Socket } from "socket.io";
import cors from "cors";
import logger from "./logger";
import { quotes } from "./data/quotes";
import Quote from "./models/Quote";

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT;
const token = process.env.DISCORD_BOT_TOKEN;
const userId: string = process.env.USER_ID!;

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
    return getActivity(userPresence);
  }

  return null;
}

function getActivity(presence: Presence): Activity {
  const curActivity = presence.activities[0];
  const name = curActivity.name;
  const type = curActivity.type;
  const details = curActivity.details;
  const state = curActivity.state;
  const imageUrl = getUrl(curActivity.assets);

  const activity: Activity = {
    name,
    type,
    details,
    state,
    imageUrl,
  };

  return activity;
}

function getUrl(asset: RichPresenceAssets | null): string {
  if (asset === null || asset === undefined)
    return process.env.NOT_FOUND_IMAGE_URL!;

  const imageUrl =
    asset.largeImage !== null
      ? asset.largeImageURL()
      : asset.smallImage !== null
      ? asset.smallImageURL()
      : "";

  return imageUrl ?? process.env.NOT_FOUND_IMAGE_URL!;
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const listners = new Map<string, Socket>();

client.on("presenceUpdate", (_, newP: Presence | null) => {
  if (newP?.userId == userId) {
    if (newP.activities.length != 0) {
      const activity = getActivity(newP);
      listners.forEach((listner) => {
        logger.info(
          "sending to: " + listner.id + " activity: " + JSON.stringify(activity)
        );
        listner.emit("activity", activity);
      });
    } else {
      listners.forEach((listner) => {
        logger.info(
          "sending to: " +
            listner.id +
            " activity: " +
            JSON.stringify(defaultActivity)
        );
        listner.emit("activity", defaultActivity);
      });
    }
  }
});

io.on("connection", (socket) => {
  logger.info("Connection made: " + socket.id);
  listners.set(socket.id, socket);
  setTimeout(async () => {
    let activity = await pollUserPresence();
    logger.info(
      "sending to: " +
        socket.id +
        " activity: " +
        JSON.stringify(activity == null ? defaultActivity : activity)
    );
    socket.emit("activity", activity == null ? defaultActivity : activity);
  }, 100);
  socket.on("disconnect", () => {
    logger.info("Disconnected: " + socket.id);
    listners.delete(socket.id);
  });
});

client.login(token);

app.get("getQuote", (req, res) => {
  const quote = selectQuote(quotes);
  logger.info("Selected quote: " + JSON.stringify(quote));
  res.status(200).json(quote);
});

function selectQuote(data: any): Quote {
  const quote = data[Math.floor(Math.random() * data.length)];
  if (quote.quote.length > 60) {
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
