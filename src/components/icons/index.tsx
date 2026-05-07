export {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  MoreHorizontal,
  Send,
  Play,
  Quote,
  Star,
  MapPin,
  Phone,
  Mail,
  X,
  Menu,
  User,
  Lock,
  Eye,
  EyeOff,
  XCircle,
  CheckCircle,
  Loader2,
  Folder,
  FileText,
  MailOpen,
  PanelRight,
  DollarSign,
  CreditCard,
  Users,
  Zap,
  Search,
  Clock,
} from "lucide-react";

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { width?: number | string; height?: number | string };

export function NextJsIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 180 180" width={width} height={height} className={className} aria-hidden="true">
      <circle cx="90" cy="90" r="90" fill="currentColor" className="text-black dark:text-white" />
      <path
        d="M 149.5 157.5 L 69.1 54 H 54 v 71.7 h 13.1 V 73.5 l 67.3 92.7 a 90 90 0 0 0 15.1 -8.7 z"
        fill="white"
        className="dark:fill-black"
      />
      <path d="M 126 54 h -13 v 52 l 13 -19.5 V 54 z" fill="white" className="dark:fill-black" />
    </svg>
  );
}

export function ReactIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={width} height={height} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="8.5" fill="#61DAFB" />
      <ellipse cx="50" cy="50" rx="46" ry="17.5" stroke="#61DAFB" strokeWidth="3" fill="none" />
      <ellipse cx="50" cy="50" rx="46" ry="17.5" stroke="#61DAFB" strokeWidth="3" fill="none" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="46" ry="17.5" stroke="#61DAFB" strokeWidth="3" fill="none" transform="rotate(120 50 50)" />
    </svg>
  );
}

export function TypeScriptIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={width} height={height} className={className} aria-hidden="true">
      <rect width="100" height="100" rx="8" fill="#3178C6" />
      <text x="10" y="71" fontSize="46" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">TS</text>
    </svg>
  );
}

export function TailwindIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 54 33" width={width} height={height} className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.666 33.809 15.82 40.5 15.82c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.756 3.154 34.691 0 27 0zM13.5 16.38C6.3 16.38 1.8 19.98 0 27.18c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.046 20.309 32.2 27 32.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653-2.147-2.2-5.212-5.417-12.403-5.417z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function StripeIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 60 60" width={width} height={height} className={className} aria-hidden="true">
      <rect width="60" height="60" rx="8" fill="#6772E5" />
      <path
        d="M29.5 20c-6 0-10 3.1-10 7.7 0 4 2.8 6.5 7.4 7.6l3.2.8c2.7.7 3.8 1.5 3.8 2.9 0 1.6-1.6 2.5-4.4 2.5-3.2 0-5.8-1.1-7.6-2.6l-2 4c2.2 1.8 5.2 2.8 9.6 2.8 6.5 0 10.5-3.1 10.5-7.9 0-4-2.7-6.4-7.8-7.6l-2.8-.7c-2.8-.7-3.9-1.4-3.9-2.7 0-1.5 1.5-2.3 4-2.3 2.8 0 5 .9 6.8 2.1l2-4C36.2 21 33.2 20 29.5 20z"
        fill="white"
      />
    </svg>
  );
}

export function AwsIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 80 48" width={width} height={height} className={className} aria-hidden="true">
      <text x="0" y="30" fontSize="26" fontWeight="900" fontFamily="Arial,sans-serif" fill="#FF9900">AWS</text>
      <path d="M8 38 Q40 50 72 38" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function NotionIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={width} height={height} className={className} aria-hidden="true">
      <rect width="100" height="100" rx="16" fill="#fff" />
      <text x="18" y="74" fontSize="70" fontWeight="900" fontFamily="Georgia,serif" fill="#000">N</text>
    </svg>
  );
}

export function FacebookIcon({ width = 32, height = 32, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} className={className} aria-hidden="true" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.79-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z" />
    </svg>
  );
}

export function TwitterIcon({ width = 32, height = 32, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} className={className} aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedinIcon({ width = 32, height = 32, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function GithubIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
