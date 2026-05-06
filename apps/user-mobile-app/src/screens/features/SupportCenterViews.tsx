import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getPublishedFaqs,
  getPublishedUserManual,
  getUserTickets,
  submitContactForm,
  submitTicket,
} from "../../api/support";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../theme/colors";

const base = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  wrap: { padding: 16 },
  title: { fontSize: 24, fontWeight: "800", color: colors.textPrimary, marginBottom: 12 },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  btnText: { color: "white", fontWeight: "700" },
});

export function SupportFaqView() {
  const [items, setItems] = useState<{ id: string; title: string; content: string }[]>([]);
  useEffect(() => {
    void getPublishedFaqs()
      .then((r) => setItems(r.payload || []))
      .catch(() => setItems([]));
  }, []);
  return (
    <SafeAreaView style={base.safe}>
      <ScrollView contentContainerStyle={base.wrap}>
        <Text style={base.title}>Support FAQ</Text>
        {items.map((f) => (
          <View style={base.card} key={f.id}>
            <Text>{f.title}</Text>
            <Text>{f.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function SupportManualView() {
  const [items, setItems] = useState<{ id: string; title: string; description?: string }[]>([]);
  useEffect(() => {
    void getPublishedUserManual()
      .then((r) => setItems(r.payload || []))
      .catch(() => setItems([]));
  }, []);
  return (
    <SafeAreaView style={base.safe}>
      <ScrollView contentContainerStyle={base.wrap}>
        <Text style={base.title}>User Manual</Text>
        {items.map((f) => (
          <View style={base.card} key={f.id}>
            <Text>{f.title}</Text>
            <Text>{f.description || ""}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function SupportContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <SafeAreaView style={base.safe}>
      <ScrollView contentContainerStyle={base.wrap}>
        <Text style={base.title}>Contact Us</Text>
        <TextInput style={base.input} value={name} onChangeText={setName} placeholder="Name" />
        <TextInput style={base.input} value={email} onChangeText={setEmail} placeholder="Email" />
        <TextInput
          style={base.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Subject"
        />
        <TextInput
          style={base.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
          multiline
        />
        <Pressable
          style={base.btn}
          onPress={() => void submitContactForm({ name, email, subject, message })}
        >
          <Text style={base.btnText}>Submit</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export function SupportTicketsView() {
  const { user } = useAppSelector((s) => s.auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tickets, setTickets] = useState<{ id: string; title: string; status: string }[]>([]);
  const load = () =>
    void getUserTickets()
      .then((r) => setTickets(r.payload || []))
      .catch(() => setTickets([]));
  useEffect(() => {
    load();
  }, []);
  return (
    <SafeAreaView style={base.safe}>
      <ScrollView contentContainerStyle={base.wrap}>
        <Text style={base.title}>Support Tickets</Text>
        <TextInput style={base.input} value={title} onChangeText={setTitle} placeholder="Title" />
        <TextInput
          style={base.input}
          value={content}
          onChangeText={setContent}
          placeholder="Issue details"
          multiline
        />
        <Pressable
          style={base.btn}
          onPress={() =>
            void submitTicket({
              type: "general",
              title,
              content,
              urgent: false,
              userId: String(user.id || ""),
            }).then(load)
          }
        >
          <Text style={base.btnText}>Submit Ticket</Text>
        </Pressable>
        {tickets.map((t) => (
          <View key={t.id} style={base.card}>
            <Text>{t.title}</Text>
            <Text>{t.status}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
