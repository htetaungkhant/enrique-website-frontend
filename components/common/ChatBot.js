import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Send, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const quickActions = [
    "Learn About Bufo Alvarius (5-MeO-DMT)",
    "Explore Our Private VIP Retreats",
    "Safety & Preparation Guidelines",
    "Healing & Integration Support",
    "Booking & Logistics",
];

const ChatBot = () => {
    const router = useRouter();
    const messagesContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: "Hi, Welcome to your journey of deep healing and transformation! I'm Bufo Bot, here to guide you through our private luxury healing retreats. How can I assist you today?",
            isComplete: true
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Show welcome message after component mount
    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowWelcome(true);
        }, 1500);

        return () => {
            clearTimeout(timer1);
        };
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (router.pathname.startsWith("/admin")) {
        return null;
    }

    const streamResponse = (response) => {
        let index = 0;
        const content = response;

        // Add initial empty message
        setMessages(prev => [...prev, {
            type: 'bot',
            content: '',
            isComplete: false
        }]);

        const interval = setInterval(() => {
            if (index < content.length) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.content += content[index];
                    return newMessages;
                });
                index++;
            } else {
                clearInterval(interval);
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.isComplete = true;
                    return newMessages;
                });
                setIsLoading(false);
            }
        }, 30); // Adjust speed as needed
    };

    const handleSendMessage = async (content) => {
        // Add user message
        setMessages(prev => [...prev, {
            type: 'user',
            content,
            isComplete: true
        }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: content }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();
            streamResponse(data.response);
        } catch (error) {
            console.error('Error:', error);
            streamResponse("I apologize, but I'm having trouble processing your request right now. Please try again later.");
        }
    };

    const openPopover = () => {
        setShowWelcome(false);
        setIsOpen(true);
    }

    const togglePopover = () => {
        setShowWelcome(false);
        setIsOpen(!isOpen);
    }

    return (
        <>
            {showWelcome && !isOpen && (
                <span onClick={openPopover} className="fixed bottom-6 right-25 z-50 max-w-[300px] bg-[#E6E8FF] p-2 rounded-lg shadow-lg cursor-pointer animate-bounce-in">
                    <div className="absolute -right-2 bottom-2 w-0 h-0 
                        border-l-[8px] border-l-transparent
                        border-t-[8px] border-t-[#E6E8FF]
                        border-r-[8px] border-r-transparent
                        transform rotate-45"
                    />
                    <p className="font-semibold text-sm">Hi,<br />Welcome to Arise Bufo Retreat</p>
                </span>
            )}
            <Popover open={isOpen} onOpenChange={togglePopover}>
                <PopoverTrigger asChild>
                    <div
                        className={cn(
                            "fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full cursor-pointer transition-transform",
                            !isOpen && "hover:scale-110",
                        )}
                    >
                        {showWelcome && <span className="w-4 h-4 rounded-full bg-red-500 z-50 absolute" />}
                        <Image
                            width={100}
                            height={100}
                            src="/icon/chat-bot.png"
                            alt="chat-bot"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[300px] md:w-[330px] xl:w-[400px] p-0 overflow-hidden"
                    side="top"
                    align="end"
                    sideOffset={16}
                >
                    {/* Header */}
                    <div className="bg-[#E6E8FF] p-3 flex items-center gap-3 relative">
                        <Image
                            width={40}
                            height={40}
                            src="/logo/vertical-logo-blue.png"
                            alt="Bufo Bot"
                            className="w-12 h-12 p-2 object-contain bg-white rounded-lg"
                        />
                        <div>
                            <h3 className="font-bold text-lg lg:text-xl">Bufo Bot</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-2 top-2 p-1 hover:bg-gray-200 rounded-full transition-colors outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={messagesContainerRef} className="p-4 h-[300px] lg:h-[400px] overflow-y-auto space-y-4">
                        {messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                        ? 'bg-primary text-white'
                                        : 'bg-[#E6E8FF]'
                                        }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {/* Quick Actions */}
                        {messages.length === 1 && (
                            <div className="grid gap-2">
                                {quickActions.map((action, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        className="w-full justify-start text-left h-auto whitespace-normal"
                                        onClick={() => handleSendMessage(action)}
                                        disabled={isLoading}
                                    >
                                        {action}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <form
                            className="flex gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (input.trim() && !isLoading) handleSendMessage(input);
                            }}
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Write your message..."
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className={cn(
                                    "cursor-pointer",
                                    isLoading && "opacity-50 cursor-not-allowed"
                                )}
                                disabled={isLoading}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default ChatBot;