import * as DashboardApi from "@initia/shared/api/dashboard";
import * as MessagingApi from "@initia/shared/api/messaging";
import * as NotificationsApi from "@initia/shared/api/notifications";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "../../store/hooks";
import { colors } from "../../theme/colors";
import * as UsersApi from "../../api/users";

const styles = StyleSheet.create({
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

export function DashboardConnectedView() {
  const [status, setStatus] = useState<string>("-");
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  useEffect(() => {
    void DashboardApi.forUser()
      .then((res) => {
        setStatus(res.payload?.status || "-");
        setNotificationsCount(res.payload?.notifications?.length || 0);
      })
      .catch(() => {
        setStatus("-");
        setNotificationsCount(0);
      });
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.card}>
          <Text>Current status: {status}</Text>
          <Text>Recent notifications: {notificationsCount}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function ProfileConnectedView() {
  const [profile, setProfile] = useState<{
    fullName?: string;
    username?: string;
    email?: string;
    phone?: string;
    role?: string;
  }>({});
  useEffect(() => {
    void UsersApi.getMe()
      .then((res) => setProfile(res.payload || {}))
      .catch(() => setProfile({}));
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          <Text>Full name: {profile.fullName || "-"}</Text>
          <Text>Username: {profile.username || "-"}</Text>
          <Text>Email: {profile.email || "-"}</Text>
          <Text>Phone: {profile.phone || "-"}</Text>
          <Text>Role: {profile.role || "-"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function NotificationsConnectedView() {
  const [items, setItems] = useState<
    { id: string; title: string; message: string; isRead?: boolean }[]
  >([]);

  const load = () =>
    void NotificationsApi.getMy()
      .then((res) => setItems((res.payload || []) as never))
      .catch(() => setItems([]));

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Notifications</Text>
        {items.map((n) => (
          <Pressable
            key={n.id}
            style={styles.card}
            onPress={() => void NotificationsApi.markAsRead(n as never).then(load)}
          >
            <Text>{n.title}</Text>
            <Text>{n.message}</Text>
            <Text>{n.isRead ? "Read" : "Unread"}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function MessagingConnectedView() {
  const { user } = useAppSelector((s) => s.auth);
  const [conversations, setConversations] = useState<{ id: string; title?: string }[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [messages, setMessages] = useState<{ id: string; text?: string; senderId: string }[]>([]);
  const [text, setText] = useState("");

  const uid = useMemo(() => String(user?.id || ""), [user?.id]);

  useEffect(() => {
    if (!uid) return;
    void MessagingApi.getConversations(uid)
      .then((res) => {
        const items = res.payload?.items || [];
        setConversations(items);
        if (items.length && !selectedConversationId) setSelectedConversationId(items[0].id);
      })
      .catch(() => setConversations([]));
  }, [uid]);

  useEffect(() => {
    if (!selectedConversationId) return;
    void MessagingApi.getMessages(selectedConversationId)
      .then((res) => setMessages(res.payload?.items || []))
      .catch(() => setMessages([]));
  }, [selectedConversationId]);

  const send = () => {
    if (!selectedConversationId || !uid || !text.trim()) return;
    void MessagingApi.sendMessage(selectedConversationId, {
      senderId: uid,
      text: text.trim(),
    }).then(() => {
      setText("");
      return MessagingApi.getMessages(selectedConversationId).then((res) =>
        setMessages(res.payload?.items || [])
      );
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Messaging</Text>
        {conversations.map((c) => (
          <Pressable key={c.id} style={styles.card} onPress={() => setSelectedConversationId(c.id)}>
            <Text>{c.title || c.id}</Text>
          </Pressable>
        ))}
        {messages.map((m) => (
          <View key={m.id} style={styles.card}>
            <Text>{m.senderId}</Text>
            <Text>{m.text || ""}</Text>
          </View>
        ))}
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type message"
        />
        <Pressable style={styles.btn} onPress={send}>
          <Text style={styles.btnText}>Send</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export function SettingsConnectedView() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    void UsersApi.getMe()
      .then((res) => {
        setFullName(res.payload?.fullName || "");
        setPhone(res.payload?.phone || "");
      })
      .catch(() => undefined);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Settings</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
        />
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
        <Pressable style={styles.btn} onPress={() => void UsersApi.updateMe({ fullName, phone })}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
