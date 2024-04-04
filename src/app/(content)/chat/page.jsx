"use client";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import Image from "next/image";

export default function Chat() {
  const [message, setMessage] = useState([
    "Hello, Who are you?",
    "Hello, I'm an intelligent virtual assistant designed to help you find the perfect job based on your specific requirements and preferences in the JobBox system.",
  ]);
  const [text, setText] = useState("");
  const [userRequest, setUserRequest] = useState("");
  const [isTextareaClicked, setIsTextareaClicked] = useState(false);

  const fetchData = async () => {
    setMessage([...message, userRequest]);
    setUserRequest("");
    try {
      setText("");
      const response = await fetch(
        `https://localhost:5011/Chat/${userRequest}`
      );
      console.log(response);
      if (!response.ok || !response.body) {
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let streamedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const decoded = decoder.decode(value);
        streamedText += decoded;
      }

      setText((prevText) => prevText + streamedText);
      setMessage((prevMessage) => [...prevMessage, streamedText]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className=" section-box mt-[10px] relative">
        <div className="max-w-[1800px] mx-auto mt-[120px] mb-[300px]">
          <div className="grid justify-items-stretch gap-8 mx-[400px]">
            {message.map((msg, index) => (
              <div
                key={index}
                className={`${index % 2 === 0 ? "area-user" : "area-bot"}`}
              >
                {index % 2 !== 0 && (
                  <div className="flex items-center gap-4 mb-2">
                    <Image
                      src={"/images/bot.png"}
                      width={30}
                      height={30}
                      alt="logo"
                      className="rounded-md max-w-full"
                    />
                    <span>JobBot GPT</span>
                  </div>
                )}
                <p
                  className={`message ${
                    index % 2 === 0 ? "message-user" : "message-bot"
                  }`}
                >
                  {msg}
                </p>
              </div>
            ))}
          </div>

          <div className="data-area">
            <div className="flex justify-center items-center">
              <div
                className={`chat-area ${isTextareaClicked ? "activebg" : ""}`}
              >
                <div className="chat-text">
                  <textarea
                    className="textarea"
                    rows="1"
                    value={userRequest}
                    placeholder="Type your message here..."
                    onChange={(e) => setUserRequest(e.target.value)}
                    onClick={() => setIsTextareaClicked(true)}
                    onBlur={() => setIsTextareaClicked(false)}
                  />
                </div>
                <button className="send-btn" onClick={() => fetchData()}>
                  <IoSend size={18} />
                </button>
              </div>
            </div>
            <hr className="mt-5" />
          </div>
        </div>
      </div>
    </>
  );
}
