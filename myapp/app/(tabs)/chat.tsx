import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useThemedStyles } from "./../styles/theme";

type Msg = { role: "user" | "assistant"; text: string };

const API_BASE = "https://gally-eight.vercel.app";
const CHAT_URL = `${API_BASE}/api/chat`;

export default function ChatScreen() {
  const styles = useThemedStyles();
  const listRef = useRef<FlatList<Msg>>(null);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Hi! I’m Periodista, your go-to place for any period related questions. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;

    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      const text = await resp.text();
      if (!resp.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", text: `HTTP ${resp.status}: ${text}` },
        ]);
        return;
      }

      const data = JSON.parse(text);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.answer ?? "No answer" },
      ]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `Network error: ${String(err)}` },
      ]);
    } finally {
      setLoading(false);
      // optional: small delay to ensure layout is committed before scrolling
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }

  const renderItem = ({ item }: { item: Msg }) => {
    const isUser = item.role === "user";
    const avatarSource = isUser
      ? require("../../assets/images/user_chat.png")
      : require("../../assets/images/periodista.png");

    return (
      <View
        style={{
          flexDirection: isUser ? "row-reverse" : "row",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        {/* avatar */}
        <View style={styles.avatarSmall}>
          <Image
            source={avatarSource}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>

        {/* bubble */}
        <View
          style={{
            backgroundColor: isUser ? "#DCF8C6" : "#EEE",
            padding: 10,
            borderRadius: 12,
            maxWidth: "75%",
            marginHorizontal: 6,
          }}
        >
          <Text>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      {/* Header */}
      <View style={[styles.chatHeader, { backgroundColor: "#FFE9EE", paddingTop: Platform.OS === "ios" ? 60 : 20 }]}>
        <Image
          source={require("../../assets/images/periodista.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text style={styles.chatTitle}>Periodista</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "green",
                marginRight: 6,
              }}
            />
            <Text style={{ color: "#666", fontSize: 12 }}>
              Currently brewing coffee…
            </Text>
          </View>
        </View>
      </View>

      {/* Messages (give the list flex:1 so it scrolls) */}
      <FlatList
        ref={listRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Composer */}
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your cycle..."
          style={{ flex: 1, backgroundColor: "#f6f6f6", padding: 12, borderRadius: 10 }}
        />
        <TouchableOpacity
          onPress={send}
          disabled={loading}
          style={{
            marginLeft: 8,
            backgroundColor: "#CA748D",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 10,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff" }}>Send</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "center", color: "#888", fontSize: 10, padding: 8 }}>
        Periodista may make mistakes — please consult a doctor for medical advice.
      </Text>
    </KeyboardAvoidingView>
  );
}
