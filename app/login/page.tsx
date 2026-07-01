import { login } from "@/actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form action={login} className="w-full max-w-sm bg-white rounded-2xl shadow p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Admin Login</h1>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full border rounded-lg px-4 py-2.5"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-2.5 font-medium"
        >
          Log in
        </button>
      </form>
    </div>
  );
}