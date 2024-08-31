import {View, FlatList, Button} from "react-native";
import Constants from 'expo-constants';
import {useEffect, useState} from "react";
import {Note, NoteFlatListItem} from "@/types";
import {NoteListItem} from "@/components/NoteListItem";
import {Link} from "expo-router";
import {useRoute} from "@react-navigation/core";

const API_URL = Constants?.expoConfig?.extra?.apiUrl;

const mapNoteDataFlatListData = (notes: Note[]) => {
  return notes.map((note) => ({ ...note, key: note.name }))
}

export default function Index() {
  const [notes, setNotes] = useState<NoteFlatListItem[]>([]);
  const { params } = useRoute() as { params: { folderId: string} };

  async function fetchFolderData() {
    try {
      const response = await fetch(`${API_URL}/folders/${params.folderId}`);
      const { data } = await response.json();
      console.log(data);
      setNotes(mapNoteDataFlatListData(data.notes))
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  useEffect(() => {
    fetchFolderData()
  }, []);

  return (
    <View>
      <FlatList data={notes}
                style={{
                  backgroundColor: "#FFF",
                  margin: 15,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 10,
                  paddingBottom: 5,
                  borderRadius: 10,
                }}
                ItemSeparatorComponent={() => (
                  <View style={{
                    height: 1,
                    backgroundColor: '#ccc',
                  }}/>
                )}
                renderItem={({item}) =>
                  <NoteListItem note={item}/>}
      />
      <View>
        <Link href="/create" asChild>
          <Button title={"Create new note"} />
        </Link>
      </View>
    </View>
  );
}
