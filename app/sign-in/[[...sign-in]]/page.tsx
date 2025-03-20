import { SignIn } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      {/* Back to landing page link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to home
      </Link>

      <div className="w-full max-w-md">
        {/* Logo and app name */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 mb-4 shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
           
          </div> */}
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
            ჭორიკანა
          </h1>
          <p className="text-blue-600 dark:text-blue-400 mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Card with sign-in component */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-2xl shadow-blue-300 dark:shadow-blue-800 border border-blue-300 dark:border-blue-700 overflow-hidden p-8 items-center">
          {/* Custom header */}
          <div className="pt-8 px-10 pb-4">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">
              Welcome Back
            </h2>
            <p className="text-md text-blue-600 dark:text-blue-400">
              Were glad to see you again
            </p>
          </div>

          {/* Clerk sign-in component */}
          <div className="mr-8 pr-10">
            <SignIn forceRedirectUrl={"/chat"} />
          </div>
        </div>

        {/* Footer section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Dont have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="/about"
              className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
