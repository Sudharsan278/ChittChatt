import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { X, Send, Image } from 'lucide-react';
import toast from 'react-hot-toast';

const ChatInput = () => {

  const [imagePreview, setImagePreview] = useState(false);
  const [text, setText] = useState("");
  const {sendMessage} = useChatStore();
  const fileRef = useRef(null);

  const handleImageSelected = (event) => {

    const file = event.target.files[0];

    if(!file.type.startsWith("image/")){
      toast.error("Select an image!");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileRef.current)
      fileRef.current.value="";
  };

  const handleSendMessage = async (event) => {

    event.preventDefault();
    if(!text.trim() && !imagePreview)
      return;

    try {
      await sendMessage({
        text : text.trim(),
        image : imagePreview
      });

      setImagePreview(null);
      setText("");
    } catch (error) {
      console.log("Error in handleSendMessqage :- "+ error.message)        
    }

  };

  return (
    
    <div className='p-4 w-full'>
         {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileRef}
                onChange={handleImageSelected}
              />
              <button
                type="button"
                className={`hidden sm:flex btn btn-circle
                        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                onClick={() => fileRef.current?.click()}
              >
                <Image size={20} />
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-circle"
              disabled={!text.trim() && !imagePreview}
            >
              <Send size={22} />
          </button>
        </form>
    </div>
  )
}

export default ChatInput
