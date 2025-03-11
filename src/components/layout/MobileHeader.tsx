interface MobileHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function MobileHeader({ isSidebarOpen, setIsSidebarOpen }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 md:hidden bg-white border-b border-gray-200">
      <button
        type="button"
        className="p-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>
    </header>
  );
}