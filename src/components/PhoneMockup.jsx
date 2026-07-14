export default function PhoneMockup({ src, alt = "" }) {
  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-ink/85 bg-ink shadow-2xl shadow-ink/25">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <img src={src} alt={alt} className="block w-full" />
      </div>
    </div>
  );
}