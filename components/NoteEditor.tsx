import {Button, InputAccessoryView, ScrollView, TextInput} from "react-native";
import {Note} from "@/types";
import {useEffect, useState} from "react";

type Props = {
  onSubmit: (note: Partial<Note>) => void;
  note?: Note;
}

export const NoteEditor = ({ note, onSubmit }: Props) => {
  const inputAccessoryViewID = 'uniqueID';
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (note?.content) {
      setContent(note.content);
    }
  }, [note?.content])

  return (
    <>
      <ScrollView style={{ backgroundColor: "#fff", height: '90%' }} keyboardDismissMode="interactive">
        <TextInput
          style={{
            padding: 16,
            height: '100%'
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setContent}
          value={content}
          placeholder={'Please type here…'}
          multiline
        />
      </ScrollView>
      {/*<InputAccessoryView nativeID={inputAccessoryViewID}>*/}
      {/*  <Button onPress={() => onSubmit({ content })} title="Save" />*/}
      {/*</InputAccessoryView>*/}
    </>
  )
}