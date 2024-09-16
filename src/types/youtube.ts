export type Snippet = {
  type: "textMessageEvent" | "superChatEvent";
  authorChannelId: string;
  displayMessage: string;
  hasDisplayContent: boolean;
  liveChatId: string;
  publishedAt: string;
  textMessageDetails: { messageText: string };
};

export type AuthorDetail = {
  channelId: string;
  channelUrl: string;
  displayName: string;
  isChatModerator: boolean;
  isChatOwner: boolean;
  isChatSponsor: boolean;
  isVerified: boolean;
  profileImageUrl: string;
};

export type ChatItem = {
  authorDetails: AuthorDetail;
  etag: string;
  id: string;
  kind: string;
  snippet: Snippet;
};
