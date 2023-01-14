import TwitterIcon, {
  type Props as TwitterIconProps,
} from "./icons/TwitterIcons";

type Props = {
  username: string;
} & TwitterIconProps;

export default function TwitterFollowButton({ username, ...rest }: Props) {
  return (
    <a
      href={`https://twitter.com/intent/follow?screen_name=${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-24 h-8 p-2 border-2 border-gray-200 rounded-full hover:bg-gray-200"
    >
      <TwitterIcon {...rest} />
      <span className="ml-1">Follow</span>
    </a>
  );
}
