import Image from "next/image";
import { useRouter } from "next/router";

const ChatBot = () => {
    const router = useRouter();

    // return this chatbot only if paths don't start with "admin"
    if (router.pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-5 z-1000 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden cursor-pointer">
            <Image
                width={100}
                height={100}
                src="/icon/chat-bot.png"
                alt="chat-bot"
                className="w-full h-full object-contain"
            />
        </div>
    )
}

export default ChatBot;