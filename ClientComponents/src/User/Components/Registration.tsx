import { object, string } from "yup";

let schema = object({
  email: string().email().required().max(255),
  username: string().required().min(8).max(32),
  password: string().required().min(8).max(64),
});

export default function Registration() {
  return (
    <form className="bg-secondary w-1/4 h-1/2 flex flex-col justify-center items-center gap-y-10 p-8 drop-shadow-md font-mono">
      <h1 className="text-2xl">Register</h1>
      <div className="flex flex-col gap-y-4 w-full">
        <input
          placeholder="email"
          className="w-full bg-secondary shadow-neo-1 py-2.5 rounded-xl px-4"
          name="email"
          onChange={(e) => {
            console.log(e);
          }}
        />
        <input
          name="username"
          placeholder="username"
          className="w-full bg-secondary shadow-neo-1 py-2.5 rounded-xl px-4"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full bg-secondary shadow-neo-1 py-2.5 rounded-xl px-4"
        />
        <button className="w-full py-2 rounded-xl flex flex-row justify-center bg-majorelle text-secondary text-xl drop-shadow-lg">
          Register
        </button>
      </div>
    </form>
  );
}
