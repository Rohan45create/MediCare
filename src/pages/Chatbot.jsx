import React, { useState, useRef, useEffect } from 'react';
import { IconSend, IconRobot, IconUser } from '@tabler/icons-react';
import { chatAPI } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your MediCare Health Advisor. How can I help you today?", isBot: true },
    ]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [language, setLanguage] = useState('en');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            const res = await chatAPI.query(currentInput, language);
            const botReply = {
                id: Date.now() + 1,
                text: res.data.answer,
                isBot: true
            };
            setMessages(prev => [...prev, botReply]);
        } catch (err) {
            console.error("Chat API Error:", err);
            const errReply = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting right now. Please try again in a moment.",
                isBot: true
            };
            setMessages(prev => [...prev, errReply]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] font-sans">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[80vh] flex flex-col">
                <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Chat header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0 flex items-center">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                            <IconRobot className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white">MediCare AI Advisor</h2>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center">
                                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1 animate-pulse"></span> Online
                            </p>
                        </div>
                        <div className="ml-auto">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                <option value="en">English (US)</option>
                                <option value="hi">Hindi</option>
                                <option value="bn">Bengali</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`flex max-w-[80%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-blue-100 dark:bg-blue-900/50 mr-3' : 'bg-slate-200 dark:bg-slate-700 ml-3'}`}>
                                        {msg.isBot ? <IconRobot size={16} className="text-blue-600 dark:text-blue-400" /> : <IconUser size={16} className="text-slate-600 dark:text-slate-300" />}
                                    </div>
                                    <div className={`px-4 py-3 rounded-2xl ${msg.isBot ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none shadow-md'}`}>
                                        {msg.isBot ? (
                                            <MarkdownRenderer content={msg.text} />
                                        ) : (
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex flex-row max-w-[80%]">
                                    <div className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 mr-3">
                                        <IconRobot size={16} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none flex space-x-1.5 items-center">
                                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about symptoms, medicines, or health advice..."
                                className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 rounded-full py-3 pl-6 pr-14 text-sm outline-none transition-all dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 h-10 w-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                            >
                                <IconSend size={18} className="ml-1" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
