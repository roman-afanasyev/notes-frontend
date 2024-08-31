import {View, Text, FlatList, Button} from "react-native";
import {useEffect, useState} from "react";
import {Folder} from "@/types/Folder";
import Constants from "expo-constants";
import {FolderFlatListItem} from "@/types/FolderFlatListItem";
import {Link} from "expo-router";

const API_URL = Constants?.expoConfig?.extra?.apiUrl;

const mapFolderDataToFlatListData = (folders: Folder[]) => {
  return folders.map((folder) => ({ ...folder, key: folder.name }))
}

export default function Index() {
  const [folders, setFolders] = useState<FolderFlatListItem[]>();

  async function fetchFolders() {
    try {
      const response = await fetch(`${API_URL}/folders`);
      const { data } = await response.json();
      setFolders(mapFolderDataToFlatListData(data))
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <View>
      <View style={{
        backgroundColor: "#FFF",
        margin: 15,
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 10,
      }}>
        <Link href="/allNotes" asChild>
          <Text>All folders</Text>
        </Link>
      </View>
      <FlatList data={folders}
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
                renderItem={(folder) => <Link href={`/folder/${folder.item.id}`}>
                  <Text>{folder.item.name}</Text>
                </Link>}
      />
      <View>
        <Link href="/create" asChild>
          <Button title={"Create new folder"} />
        </Link>
      </View>
    </View>
  )
}