import { useState } from 'react';
import { toast } from 'react-toastify';

const UrlTable = ({ urls }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('URL copied to clipboard!');

      // Reset the copied state after animation
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const handleUrlClick = (url) => {
    window.open(url, '_blank');
  };

  const truncateUrl = (url, maxLength = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  return (
    <div className="w-full lg:w-[90%] xl:w-[80%] shadow-lg rounded-lg overflow-hidden">
      {/* Scrollable table container */}
      <div className="overflow-x-auto">
        <div className="max-h-[200px] md:max-h-[300px] overflow-y-auto">
          <table className="min-w-full bg-white">
            {/* Sticky Header */}
            <thead className="bg-linear-to-r from-blue-500 to-blue-600 sticky top-0 z-10">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider w-[35%]">
                  Original URL
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider w-[30%]">
                  Short URL
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider hidden sm:table-cell w-[15%]">
                  Clicks
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider w-[20%]">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Scrollable Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {urls.map((url, index) => (
                <tr
                  key={index}
                  className="h-16 hover:bg-blue-50 transition-colors duration-200 ease-in-out"
                >
                  <td className="px-3 sm:px-4 md:px-6 py-4 align-middle w-[35%]">
                    <span
                      className="text-gray-800 inline-block max-w-[150px] sm:max-w-xs md:max-w-md truncate text-sm"
                      title={url.originalUrl}
                    >
                      {truncateUrl(url.originalUrl, 60)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4 align-middle w-[30%]">
                    <span
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-150 font-medium text-sm"
                      onClick={() => handleUrlClick(url.shortUrl)}
                      title={url.shortUrl}
                    >
                      {url.shortUrl}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4 align-middle hidden sm:table-cell w-[15%]">
                    <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-gray-100 text-gray-800">
                      {url.counts}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4 align-middle w-[20%]">
                    <button
                      onClick={() => handleCopy(url.shortUrl, index)}
                      className={`
                        relative overflow-hidden group
                        w-[90px] sm:w-[100px]
                        px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm
                        transition-all duration-300 ease-in-out
                        ${copiedIndex === index
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                        }
                        active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                      `}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                        {copiedIndex === index ? (
                          <>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="hidden sm:inline">Copied!</span>
                            <span className="sm:hidden">✓</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </span>
                      {/* Ripple effect */}
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {urls.length === 0 && (
        <div className="bg-white py-8 sm:py-12 text-center">
          <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <p className="mt-4 text-gray-500 font-medium text-sm sm:text-base">No URLs yet</p>
          <p className="mt-1 text-xs sm:text-sm text-gray-400 px-4">Create your first short URL to get started</p>
        </div>
      )}
    </div>
  );
};

export default UrlTable;