import { ActivityType } from "discord.js";

interface Activity {
  name: string;
  type: ActivityType;
  details: string | null;
  state: string | null;
  imageUrl: string;
}

export default Activity;
