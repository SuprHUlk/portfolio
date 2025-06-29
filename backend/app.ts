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

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT;
const token = process.env.DISCORD_BOT_TOKEN;
const userId: string = process.env.USER_ID!;

const defaultActivity: Activity = {
  name: "Sleep",
  type: 0,
  details: null,
  state: null,
  imageUrl: process.env.DEFAULT_ACTIVITY_IMAGE_URL!,
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const listners = new Map<string, Socket>();

client.on("presenceUpdate", (_, newP: Presence | null) => {
  if (newP?.userId == userId) {
    if (newP.activities.length != 0) {
      const curActivity = newP.activities[0];
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

      listners.forEach((listner) => {
        console.log("sending");
        listner.emit("activity", activity);
      });
    } else {
      listners.forEach((listner) => {
        console.log("sending");
        listner.emit("activity", defaultActivity);
      });
    }
  }
});

function getUrl(asset: RichPresenceAssets | null): string {
  if (asset === null || asset === undefined) return "";

  const imageUrl =
    asset.largeImage !== null
      ? asset.largeImageURL()
      : asset.smallImage !== null
      ? asset.smallImageURL()
      : "";

  return imageUrl ?? "";
}

io.on("connection", (socket) => {
  console.log("Connection made: " + socket.id);
  listners.set(socket.id, socket);
  setTimeout(() => {
    socket.emit("activity", defaultActivity);
  }, 100);
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);
    listners.delete(socket.id);
  });
});

client.login(token);

//health checkpoint
app.get("/", (_, res: any) => {
  res.status(200).send("OK");
});

server.listen(port, () => {
  console.log("Listening on port: " + port);
});
