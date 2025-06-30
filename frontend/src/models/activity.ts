enum Type {
  Playing,
  Streaming,
  Listening,
  Custom,
  Watching,
  Competing,
  Sleeping,
}

const TypeValues: Record<Type, string> = {
  [Type.Playing]: 'https://www.svgrepo.com/show/59135/game-controller.svg',
  [Type.Streaming]: '',
  [Type.Listening]:
    'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
  [Type.Custom]: '',
  [Type.Watching]: '',
  [Type.Competing]: '',
  [Type.Sleeping]: '',
};

interface Activity {
  name: string;
  type: Type;
  details: string | null;
  state: string | null;
  imageUrl: string;
}

export { Activity, Type, TypeValues };
