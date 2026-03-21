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
    <div className="flex flex-col h-full bg-slate-50 relative">

      <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 sticky top-0 shadow-sm">
        <div className="relative">
          <img
            src={data.profilePhoto}
            alt="User avatar"
            className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm object-cover"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900 leading-tight">
            {data.fullName}
          </h2>
          <p className="text-xs text-green-600 font-medium">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg, index) => {
          const isMe = msg.sender === myUserId;
          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words flex flex-col gap-2 ${
                  isMe
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 rounded-bl-sm shadow-sm ring-1 ring-gray-100"
                }`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Chat Image"
                    className="max-w-[200px] rounded-lg object-cover"
                  />
                )}
                {msg.text && <span>{msg.text}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 pb-6 sm:pb-4 bottom-0">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl ring-1 ring-inset ring-gray-200 focus-within:ring-2 focus-within:ring-indigo-600 transition-shadow"
        >
          <label className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUploadAndSend}
            />
            <svg
              className="w-5 h-5"
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
            className="p-2.5 rounded-xl transition-all cursor-pointer"
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
