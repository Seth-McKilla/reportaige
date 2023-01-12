export default function Footer() {
  return (
    <div className="py-4 text-center text-black">
      <a
        href="https://github.com/seth/my-project"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-md hover:text-gray-800"
      >
        Contribute
      </a>
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
