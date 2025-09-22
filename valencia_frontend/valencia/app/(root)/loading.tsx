export default function Loading() {
  return (
    <div
      className={`
        fixed inset-0 z-50 h-screen w-screen bg-white 
        flex flex-col items-center justify-center
        transition-opacity duration-300
      `}
    >
      <div className="border-primary flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-t-transparent"></div>
    </div>
  );
}
