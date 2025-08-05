import { FaWhatsapp } from "react-icons/fa";

export default function WhatsApp() {
    return (
        <a href="https://wa.me/420777004797" target="_blank" rel="noopener noreferrer" className="fixed bottom-22 lg:bottom-26 bg-green-500 p-1.5 right-5 z-50 w-13 h-13 lg:w-16 lg:h-16 rounded-full cursor-pointer transition-transform hover:scale-110">
            <FaWhatsapp className="w-full h-full text-white" />
        </a>
    );
}