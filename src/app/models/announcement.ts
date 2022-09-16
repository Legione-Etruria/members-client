// 1. Crea un'interfaccia che rappresenti il documento in MongoDB
export interface Announcement {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  users: { user: string; readDate: Date | null }[];
  location?: string;
  attachments?: { base64: string; name: string; type: string }[];
  publicId?: string;
}
