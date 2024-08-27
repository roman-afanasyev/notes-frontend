import {useLocalSearchParams} from "expo-router";
import {NoteEditor} from "@/components/NoteEditor";
import {useEffect, useState} from "react";
import Constants from "expo-constants";
import {Note} from "@/types";
import {Modal, Pressable, View, Text} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {AddToFolderModal} from "@/components/AddToFolderModal";

const API_URL = Constants?.expoConfig?.extra?.apiUrl;

export default function EditPage() {
  const { noteId } = useLocalSearchParams();
  const [note, setNote] = useState<Note>();
  const [addToFolderModalVisible, setAddToFolderModalVisible] = useState<boolean>(false);

  const fetchNote = async () => {
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`);
      const { data } = await response.json();
      console.log(data);
      setNote(data);
      // setNotes(mapNoteDataFlatListData(data))
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }


  const saveNote = async (newNote: Partial<Note>): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...note,
          ...newNote
        }),
      });
      // const { data } = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }

  const onAddToFolder = () => {
    setAddToFolderModalVisible(true);
  }

  useEffect(() => {
    if (noteId) {
      fetchNote()
    }
  }, [noteId]);

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      <NoteEditor note={note} onSubmit={saveNote} />
      <View>
        <Pressable onPress={onAddToFolder}>
          <AntDesign name="addfolder" size={24} color="black" />
        </Pressable>
      </View>
      <AddToFolderModal isOpen={addToFolderModalVisible} note={note} onClose={() => setAddToFolderModalVisible(false)} />
    </View>
  )
}