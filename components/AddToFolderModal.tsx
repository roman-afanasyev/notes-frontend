import {FlatList, Modal, Pressable, Text, View} from "react-native";
import {Note} from "@/types";
import {useEffect, useState} from "react";
import Constants from "expo-constants";
import {Folder} from "@/types/Folder";
import {NoteListItem} from "@/components/NoteListItem";
import {FolderFlatListItem} from "@/types/FolderFlatListItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
}

const API_URL = Constants?.expoConfig?.extra?.apiUrl;

const mapFoldersDataToFlatListData = (folders: Folder[]) => {
  return folders.map((folder) => ({ ...folder, key: folder.name }))
}

export const AddToFolderModal = ({ isOpen, note, onClose }: Props) => {
  const [folders, setFolders] = useState<FolderFlatListItem[]>([]);

  const fetchFolders = async () => {
    try {
      const response = await fetch(`${API_URL}/folders`);
      const { data } = await response.json();
      console.log(data);
      setFolders(mapFoldersDataToFlatListData(data));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  const onFolderChoose = async (folder: FolderFlatListItem) => {
    try {
      const response = await fetch(`${API_URL}/folders/${folder.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...folder,
          notes: {...folder.notes, note}
        }),
      });
      onClose();
      // const { data } = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }

  useEffect(() => {
    fetchFolders()
  }, []);

  console.log(folders);

  return (
    <Modal
      visible={isOpen}
      transparent
    >
      <View style={{
        marginTop: 600,
        marginLeft: 20,
        marginRight: 20,
        shadowColor: "black",
        shadowRadius: 10,
        shadowOpacity: 0.3,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
      }}>
        <FlatList data={folders}
                  // style={{
                  //   backgroundColor: "#FFF",
                  //   margin: 15,
                  //   paddingLeft: 15,
                  //   paddingRight: 15,
                  //   paddingTop: 10,
                  //   paddingBottom: 5,
                  //   borderRadius: 10,
                  // }}
                  ItemSeparatorComponent={() => (
                    <View style={{
                      height: 1,
                      backgroundColor: '#ccc',
                    }}/>
                  )}
                  renderItem={({item}) =>
                    (
                      <Pressable onPress={() => onFolderChoose(item)}>
                        <Text>{item.name}</Text>
                      </Pressable>
                    )
                  }
        />
      </View>
    </Modal>
  )
}

