import { X } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const TagInput = ({ tags, setTags, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (!tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        setTags(newTags);
        onChange(newTags);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 min-h-[42px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded transition-colors"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <InputText
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Ketik tag dan tekan Enter" : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default TagInput;
