import {Note} from "@/types/Note";

export interface Folder {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  notes: Note[] | null[];
}