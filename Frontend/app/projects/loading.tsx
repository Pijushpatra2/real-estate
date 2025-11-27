
//projects/loading.tsx


export default function Loading() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md animate-pulse min-h-[550px]"
            >
              <div className="bg-gray-300 h-64 w-full"></div>
              <div className="flex flex-col flex-1 p-6">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                <div className="mt-auto h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
