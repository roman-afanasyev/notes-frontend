import Constants from "expo-constants";
import {NoteEditor} from "@/components/NoteEditor";
import {Note} from "@/types";

const API_URL = Constants?.expoConfig?.extra?.apiUrl;

export default function Index() {
  async function saveNote(note: Partial<Note>): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note),
      });
      // const { data } = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }

  return (
    <NoteEditor onSubmit={saveNote}/>
  )
}