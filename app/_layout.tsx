import { Stack } from "expo-router";
import {NoteEllipsisMenu} from "@/components/NoteEllipsisMenu";
import {MenuProvider} from "react-native-popup-menu";

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="[folderId]" />
        <Stack.Screen name="[noteId]" options={{
          headerRight: NoteEllipsisMenu,
        }} />
      </Stack>
    </MenuProvider>
  );
}
