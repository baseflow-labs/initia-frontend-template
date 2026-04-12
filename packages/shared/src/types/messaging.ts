export interface Conversation {
  id: string;
  isGroup: boolean;
  title?: string;
  description?: string;
  avatarUrl?: string;
  lastMessageAt?: string;
  lastMessageId?: string;
  directPairKey?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessage {
  id: string;
  userMessagingId: string;
  senderId: string;
  text?: string;
  parentMessageId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationParticipant {
  id: string;
  userMessagingId: string;
  userId: string;
  role: "owner" | "admin" | "member";
  isActive: boolean;
  muted: boolean;
  lastReadAt?: string;
  createdAt: string;
  updatedAt: string;
}
