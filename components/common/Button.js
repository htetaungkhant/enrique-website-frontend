import React from "react";

const Button = ({ name, onClick }) => {
	return (
		<button
			className="flex items-center gap-2 bg-white text-black poppins-semibold px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
			onClick={onClick} // Ensures correct event handling
		>
			<span className="text-lg">{name}</span>
			<img src="/export.svg" className="w-auto h-8" alt="icon" />
		</button>
	);
};

export default Button;
