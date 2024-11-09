export function Avatar({ src, alt }: { src?: string; alt?: string }) {
  const firstLetter = alt?.charAt(0).toUpperCase();

  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
      {src ? (
        <img src={src} alt={alt} className="rounded-full" />
      ) : (
        <p className="text-base font-medium">{firstLetter}</p>
      )}
    </div>
  );
}
