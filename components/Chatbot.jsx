import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!inputText) return;

    // Append user message to chat history
    setChatHistory([...chatHistory, { text: inputText, sender: 'user' }]);

    // Make request to OpenAI API
    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 150
        })
      });

      const data = await response.json();

      // Append bot response to chat history
      setChatHistory([...chatHistory, { text: data.choices[0].text.trim(), sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear input
    setInputText('');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        {chatHistory.map((message, index) => (
          <Text key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            {message.text}
          </Text>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatBot;
