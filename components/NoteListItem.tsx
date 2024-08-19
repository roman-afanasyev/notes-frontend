import {NoteFlatListItem} from "@/types";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";
import dayjs from 'dayjs'
import React from "react";
import {Href, Link} from "expo-router";

type Props = {
  note: NoteFlatListItem;
}

// const Date = (date: string) => {
// }

export const NoteListItem = ({ note }: Props) => {
  return (
    <Link href={`/${note.id}` as Href<string>} asChild>
      <TouchableHighlight onPress={() => {}}>
        <View style={styles.container}>
          <Text style={styles.title}>{note.key}</Text>
          <View style={styles.noteData}>
            <Text>{dayjs(note.updated_at).format('D.MM.YYYY')}</Text>
            <Text style={styles.content}>{note.content}</Text>
          </View>
          {/*<Text>{note.folder}</Text>*/}
        </View>
      </TouchableHighlight>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 7,
    marginTop: 7,
  },
  title: {
    fontWeight: "bold",
  },
  noteData: {
    flexDirection: "row",
  },
  content: {
    marginLeft: 5,
  }
});