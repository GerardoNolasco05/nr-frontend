import { useState } from "react";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const onChange =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just a dummy action:
    alert(`Message sent!\n\nName: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
  };

  return (
    <form onSubmit={onSubmit} className="font-dos text-stone-300 space-y-3">
      <div>
        <label className="block mb-1">Name</label>
        <input
          className="
            w-full bg-[#ffffff] text-black
            border border-[#4b5563]
            shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
            px-2 py-1
          "
          type="text"
          value={values.name}
          onChange={onChange("name")}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          className="
            w-full bg-[#ffffff] text-black
            border border-[#4b5563]
            shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
            px-2 py-1
          "
          type="email"
          value={values.email}
          onChange={onChange("email")}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Message</label>
        <textarea
          className="
            w-full h-32 bg-[#ffffff] text-black
            border border-[#4b5563]
            shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
            px-2 py-1
            resize-none
          "
          value={values.message}
          onChange={onChange("message")}
          required
        />
      </div>

      <div className="pt-2">
        <button type="submit" className="px-3 py-1 bg-pink-400 text-white hover:bg-blue-600 rounded">
          Send
        </button>
      </div>
    </form>
  );
}
