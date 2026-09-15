import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";

const SITE_NAME = '買ったっけ？！'

const navItems = [
  { label: "買い物リスト", to: "/" },
  { label: "変更履歴", to: "/change-history" },
];

type HeaderLinkProps = {
  to: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  children: ReactNode;
};

const DefaultLink = ({ to, children, ...props }: HeaderLinkProps) => (
  <a href={to} {...props}>
    {children}
  </a>
);

type HeaderProps = {
  LinkComponent?: ComponentType<HeaderLinkProps>;
};

export default function Header({ LinkComponent = DefaultLink }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <LinkComponent
          to="/"
          className="font-bold text-xl tracking-tight"
          style={{ color: "#f1582c" }}
        >
          { SITE_NAME }
        </LinkComponent>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="メニューを開く"
          className="text-gray-700 text-2xl leading-none"
        >
          &#8801;
        </button>
      </header>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-bold text-xl" style={{ color: "#f1582c" }}>
            { SITE_NAME }
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="メニューを閉じる"
            className="text-gray-500 text-xl leading-none"
          >
            &#x2715;
          </button>
        </div>
        <nav className="mt-1">
          {navItems.map((item) => (
            <LinkComponent
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-gray-800 hover:text-gray-500 transition-colors"
            >
              {item.label}
              <span className="text-gray-400 text-lg">&#8250;</span>
            </LinkComponent>
          ))}
        </nav>
      </div>
    </>
  );
}
