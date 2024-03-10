import React, { useRef, useEffect } from "react";

const DotTextArea = ({onTextChange,text}) => {
  const textAreaRef = useRef(null);

useEffect(() => {
  if(text){
    onTextChange(textAreaRef.current.value = text);
  }
}),[];

  const handleInput = () => {
    const currentTextArea = textAreaRef.current;
    const value = currentTextArea.value;

    // Check if the first line is empty or contains only whitespace characters
    const firstLine = value.split("\n")[0].trim();

    if (firstLine === "") {
      // Hide the bullet by removing it from the value
      currentTextArea.value = value.replace(/^\u2022\s+/gm, "");
    } else if (!value.startsWith("\u2022 ")) {
      // Add the bullet if it is missing
      currentTextArea.value = "\u2022 " + value;
    }
    onTextChange(currentTextArea.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentTextArea = textAreaRef.current;
      const start = currentTextArea.selectionStart;
      const end = currentTextArea.selectionEnd;
      const value = currentTextArea.value;

      // Insert a big dot at the beginning of the new line
      const newValue =
        value.substring(0, start) +
        "\n\u2022 " +
        value.substring(end, value.length);

      // Update the textarea value and move the cursor to the new line
      currentTextArea.value = newValue;
      currentTextArea.selectionStart = start + 3;
      currentTextArea.selectionEnd = start + 3;
      onTextChange(currentTextArea.value);
      console.log(newValue);
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className="dotTextArea"
      onKeyDown={handleKeyDown}
      onInput={handleInput}
    ></textarea>
  );
};

export default DotTextArea;
