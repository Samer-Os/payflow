import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo/logo.svg"
        alt="Logo"
        width={32}
        height={32}
        className="h-8 w-auto"
      />
      <span className="text-2xl font-bold tracking-tight text-midnight_text dark:text-white">
        Payflow
      </span>
    </Link>
  );
};

export default Logo;