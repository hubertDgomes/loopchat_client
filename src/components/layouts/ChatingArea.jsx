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
    <div className="flex flex-col h-full bg-transparent relative w-full border-r border-white/5">

      <div className="flex items-center space-x-3 sm:space-x-4 p-4 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 z-10 sticky top-0 shadow-lg">
        <div className="relative">
          <img
            src={data.profilePhoto}
            alt="User avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] object-cover hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-tight truncate">
            {data.fullName}
          </h2>
          <p className="text-xs sm:text-sm text-green-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
            Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 sm:space-y-6">
        {messages.map((msg, index) => {
          const isMe = msg.sender === myUserId;
          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] sm:max-w-md break-words flex flex-col gap-2 shadow-lg transition-all duration-200 hover:shadow-xl ${
                  isMe
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-br-sm shadow-indigo-900/50"
                    : "bg-slate-800 text-slate-200 rounded-bl-sm shadow-black/30 ring-1 ring-white/5"
                }`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Chat Image"
                    className="max-w-full rounded-xl object-cover shadow-md hover:shadow-lg transition-shadow duration-200 mb-1"
                  />
                )}
                {msg.text && <span className="leading-relaxed">{msg.text}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 pb-6 sm:pb-4 bottom-0">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 bg-slate-800/60 p-2 sm:p-3 rounded-2xl ring-1 ring-inset ring-white/5 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all duration-300 shadow-lg relative overflow-hidden"
        >
          <label className="p-2 text-slate-400 hover:text-indigo-400 transition-all duration-200 rounded-xl hover:bg-white/5 cursor-pointer group">
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
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm py-2 px-2 text-slate-100 placeholder:text-slate-500 outline-none"
          />

          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95"
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
