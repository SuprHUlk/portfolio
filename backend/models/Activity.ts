enum ActivityType {
  Playing = 0,
  Streaming = 1,
  Listening = 2,
  Watching = 3,
  Custom = 4,
  Competing = 5,
  Sleeping = 6,
}

interface Activity {
  name: string;
  type: ActivityType;
  details: string | null;
  state: string | null;
  imageUrl: string;
}

export default Activity;
