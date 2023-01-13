import GithubIcon from "@/icons/GithubIcon";

export default function Footer() {
  return (
    <div className="flex flex-col py-4 text-center text-black">
      <div className="flex justify-center mb-2">
        <GithubIcon />
        <a
          href="https://github.com/Seth-McKilla/reportaige"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 underline text-md hover:text-gray-800"
        >
          Contribute
        </a>
      </div>
      <p>
        Created by{" "}
        <a
          href="https://twitter.com/sethmckilla"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline hover:text-gray-800"
        >
          Seth
        </a>
      </p>
    </div>
  );
}
