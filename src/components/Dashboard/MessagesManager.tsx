import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Smile } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | 'them';
}

interface Conversation {
  id: number;
  studentName: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

const generateMessages = (): Message[] => {
  const messages: Message[] = [];
  const messageCount = faker.number.int({ min: 10, max: 20 });
  for (let i = 0; i < messageCount; i++) {
    messages.push({
      id: i,
      text: faker.lorem.sentence(),
      timestamp: faker.date.recent({ days: 1 }).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      sender: faker.helpers.arrayElement(['me', 'them', 'them']),
    });
  }
  return messages.sort((a, b) => new Date(`1970/01/01 ${a.timestamp}`).getTime() - new Date(`1970/01/01 ${b.timestamp}`).getTime());
};

const generateConversations = (): Conversation[] => {
  return Array.from({ length: 10 }, (_, i) => {
    const messages = generateMessages();
    return {
      id: i + 1,
      studentName: faker.person.fullName(),
      avatar: faker.image.avatar(),
      lastMessage: faker.lorem.sentence(5),
      lastMessageTime: faker.date.recent({ days: 2 }).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      unreadCount: faker.helpers.arrayElement([0, 0, 0, 1, 2, 3]),
      online: faker.datatype.boolean(),
      messages,
    };
  });
};

const MessagesManager: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(generateConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: selectedConversation.messages.length + 1,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
    };

    setSelectedConversation(updatedConversation);

    const updatedConversations = conversations.map(c => 
      c.id === updatedConversation.id ? updatedConversation : c
    );
    setConversations(updatedConversations);
    setNewMessage('');
  };

  return (
    <div className="h-full flex bg-surface">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary mb-4">Mensagens</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(convo => (
            <button
              key={convo.id}
              onClick={() => setSelectedConversation(convo)}
              className={`w-full text-left p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                selectedConversation.id === convo.id ? 'bg-primary/5' : ''
              }`}
            >
              <div className="relative">
                <img src={convo.avatar} alt={convo.studentName} className="w-12 h-12 rounded-full" />
                {convo.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface"></span>}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-text-primary truncate">{convo.studentName}</h3>
                  <span className="text-xs text-text-secondary">{convo.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-text-secondary truncate">{convo.lastMessage}</p>
                  {convo.unreadCount > 0 && (
                    <span className="bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {convo.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-4">
              <img src={selectedConversation.avatar} alt={selectedConversation.studentName} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-text-primary">{selectedConversation.studentName}</h3>
                <p className={`text-sm ${selectedConversation.online ? 'text-success' : 'text-text-secondary'}`}>
                  {selectedConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div className="space-y-6">
                {selectedConversation.messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'them' && <img src={selectedConversation.avatar} alt="" className="w-8 h-8 rounded-full self-end"/>}
                    <div className={`max-w-md p-3 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-white text-text-primary shadow-card rounded-bl-none'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-text-secondary'}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-surface border-t border-border">
              <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <button type="button" className="p-2 text-text-secondary hover:text-primary"><Paperclip className="w-5 h-5"/></button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="button" className="p-2 text-text-secondary hover:text-primary"><Smile className="w-5 h-5"/></button>
                <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-secondary">
            <p>Selecione uma conversa para começar a conversar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
