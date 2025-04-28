import { useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const HeaderDropdown = ({ title, children }) => {
    const constainerRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleClick = () => {
        if (dropdownRef.current) {
            dropdownRef.current.classList.toggle("hidden");
        }
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !constainerRef.current.contains(event.target)) {
            dropdownRef.current.classList.add("hidden");
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    
    return (
        <div ref={constainerRef} className="relative z-10">
            <button onClick={handleClick} className="w-full flex items-center justify-center gap-2 poppins-medium cursor-pointer">
                {title}
                <FaAngleDown className="text-white" />
            </button>
            <div ref={dropdownRef} className="relative xl:absolute hidden xl:mt-2">
                {children}
            </div>
        </div>
    );
}

export default HeaderDropdown;
// Usage:
// <HeaderDropdown title="Menu">
//   <ul className="p-4">
//     <li className="py-2 hover:bg-gray-100">Item 1</li>
//     <li className="py-2 hover:bg-gray-100">Item 2</li>
//     <li className="py-2 hover:bg-gray-100">Item 3</li>
//   </ul>
// </HeaderDropdown>