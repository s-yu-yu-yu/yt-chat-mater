import { ChatItem } from "./types/youtube";

const KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const getChatId = async (
  youtubeUrl: string
): Promise<string | undefined> => {
  // @see https://developers.google.com/youtube/v3/docs/videos/list?hl=ja
  // const videoId = youtubeUrl.replace("https://www.youtube.com/watch?v=", "");
  const videoId = youtubeUrl;
  console.log("videoId", videoId);

  const url = "https://www.googleapis.com/youtube/v3/videos";
  const params = { key: KEY, id: videoId, part: "liveStreamingDetails" };
  const data = await fetch(`${url}?${new URLSearchParams(params)}`).then(
    (res) => res.json()
  );
  const details = data["items"][0]["liveStreamingDetails"];
  console.log("details", details);
  if ("activeLiveChatId" in details) {
    return details["activeLiveChatId"];
  }
};

export const getChat = async (chatId: string, pageToken?: string) => {
  // @see https://developers.google.com/youtube/v3/live/docs/liveChatMessages/list
  const url = "https://www.googleapis.com/youtube/v3/liveChat/messages";
  let params = {
    key: KEY,
    liveChatId: chatId,
    part: "id,snippet,authorDetails",
    pageToken: pageToken || "",
  };
  const data = await fetch(`${url}?${new URLSearchParams(params)}`).then(
    (res) => res.json()
  );

  console.log("data", data);

  return {
    nextPageToken: data["nextPageToken"],
    items: data["items"],
  } as {
    nextPageToken: string;
    items: ChatItem[];
  };
};
