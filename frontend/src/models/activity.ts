enum Type {
  Playing = 0,
  Streaming = 1,
  Listening = 2,
  Custom = 3,
  Watching = 4,
  Competing = 5,
  Sleeping = 6,
}

const TypeValues: Record<Type, string> = {
  [Type.Playing]: 'https://www.svgrepo.com/show/59135/game-controller.svg',
  [Type.Streaming]: '',
  [Type.Listening]:
    'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
  [Type.Custom]: '',
  [Type.Watching]: 'https://i.ibb.co/1YqY21K1/tv-17189491.png',
  [Type.Competing]: '',
  [Type.Sleeping]: 'https://i.ibb.co/NngTJKzb/zzz-1.png',
};

interface Activity {
  name: string;
  type: Type;
  details: string | null;
  state: string | null;
  imageUrl: string;
}

export { Activity, Type, TypeValues };
