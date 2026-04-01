import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_API_LINK}`);

const ChatingArea = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  // console.log(id);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_LINK}/api/getuser`, { withCredentials: true })
      .then((res) => setUserId(res.data._id));
  }, []);

  // console.log(userId);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_LINK}/api/getuserbyid/${id}`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data));
  }, [id]);

  // console.log(data);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const myUserId = userId; 
  const roomId = myUserId && id ? [myUserId, id].sort().join("_") : null;
  useEffect(() => {
    if (!roomId) return;


    socket.emit("join_room", roomId);

    socket.emit("get_message" , roomId)


    socket.on("load_message" , (data)=> {
      setMessages(data);
    })

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });


    return () => {
      socket.off("load_message");
      socket.off("get_message");
      socket.off("receive_message");
    };
  }, [roomId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = {
      room: roomId,
      text: input,
      sender: myUserId,
      imageUrl: null,
    };

    socket.emit("send_message", messageData);
    setInput("");
  };

  const handleImageUploadAndSend = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_LINK}/api/upload-chat-photo`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImageUrl = res.data.imageUrl;

      const messageData = {
        room: roomId,
        text: "",
        sender: myUserId,
        imageUrl: uploadedImageUrl,
      };

      socket.emit("send_message", messageData);
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  // console.log(messages);
  

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50/50 to-white relative">

      <div className="flex items-center space-x-3 sm:space-x-4 p-4 bg-white/90 backdrop-blur-md border-b border-gray-100/80 z-10 sticky top-0 shadow-sm">
        <div className="relative">
          <img
            src={data.profilePhoto}
            alt="User avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-3 ring-white/80 shadow-lg object-cover hover:shadow-xl transition-all duration-300"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
            {data.fullName}
          </h2>
          <p className="text-xs sm:text-sm text-green-600 font-medium flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 sm:space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.sender === myUserId;
          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm max-w-xs sm:max-w-sm break-words flex flex-col gap-2 shadow-sm transition-all duration-200 hover:shadow-md ${
                  isMe
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-sm shadow-indigo-200/50"
                    : "bg-white text-gray-900 rounded-bl-sm shadow-gray-100/50 ring-1 ring-gray-100/50"
                }`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Chat Image"
                    className="max-w-[200px] sm:max-w-[250px] rounded-xl object-cover shadow-sm hover:shadow-md transition-shadow duration-200"
                  />
                )}
                {msg.text && <span className="leading-relaxed">{msg.text}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white/95 backdrop-blur-md border-t border-gray-100/80 pb-6 sm:pb-4 bottom-0">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-2xl ring-1 ring-inset ring-gray-200/50 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <label className="p-2 text-gray-400 hover:text-indigo-600 transition-all duration-200 rounded-xl hover:bg-white/50 cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUploadAndSend}
            />
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </label>

          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm py-2 px-2 text-gray-900 placeholder:text-gray-400 outline-none"
          />

          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-4 h-4 translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatingArea;
