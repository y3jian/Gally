import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

const API_BASE = "https://gally-eight.vercel.app";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Hi! I’m Periodista, your go-to place for any questions period related. How can I help you today?",
    }
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const CHAT_URL = "https://gally-eight.vercel.app/api/chat";


  async function send() {
    const q = input.trim();
  if (!q || loading) return;
  setMessages(m => [...m, { role: "user", text: q }]);
  setInput(""); setLoading(true);

  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    });

    const text = await resp.text();   // capture raw response
    if (!resp.ok) {
      setMessages(m => [...m, { role: "assistant", text: `HTTP ${resp.status}: ${text}` }]);
      return;
    }

    const data = JSON.parse(text);
    setMessages(m => [...m, { role: "assistant", text: data.answer ?? "No answer" }]);
  } catch (err: any) {
    setMessages(m => [...m, { role: "assistant", text: `Network error: ${String(err)}` }]);
  } finally {
    setLoading(false);
  }
}

  return (
    <View style={{ flex:1, backgroundColor:"#fff", paddingTop:50 }}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding:16 }}
        renderItem={({ item }) => (
          <View style={{
            alignSelf: item.role === "user" ? "flex-end" : "flex-start",
            marginBottom:12, maxWidth:"85%"
          }}>
            <Text style={{
              backgroundColor: item.role === "user" ? "#DCF8C6" : "#EEE",
              padding:10, borderRadius:12
            }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={{ flexDirection:"row", padding:12, borderTopWidth:1, borderColor:"#eee" }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your cycle..."
          style={{ flex:1, backgroundColor:"#f6f6f6", padding:12, borderRadius:10 }}
        />
        <TouchableOpacity
          onPress={send}
          disabled={loading}
          style={{ marginLeft:8, backgroundColor:"#111", paddingVertical:12, paddingHorizontal:16, borderRadius:10 }}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color:"#fff" }}>Send</Text>}
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign:"center", color:"#888", fontSize:12, padding:8 }}>
        Informational only — not medical advice.
      </Text>
    </View>
  );
}