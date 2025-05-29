interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
}

export default function SearchBar({ searchTerm, onSearchChange, isSearching }: SearchBarProps) {
  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Search Pokemon by name (min 3 characters)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isSearching ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>
      {searchTerm.length > 0 && searchTerm.length < 3 && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Please enter at least 3 characters to search
        </p>
      )}
    </div>
  );
}
