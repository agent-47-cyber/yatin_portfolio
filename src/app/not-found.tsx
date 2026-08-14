import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0c] p-6 text-center font-mono-system text-[#8a8a8e]">
      <p className="text-xs tracking-[0.3em] text-[#00e5ff] uppercase">404 // SECTOR NOT FOUND</p>
      <h1 className="mt-2 font-display text-3xl text-[#f0ece4]">COORDINATES OUT OF BOUNDS</h1>
      <p className="mt-4 max-w-sm text-xs">
        The requested orbital vector does not correspond to an active observation sector.
      </p>
      <Link
        href="/"
        className="mt-6 rounded border border-[hsla(0,0%,100%,0.1)] px-5 py-2.5 text-xs text-[#00e5ff] hover:bg-[#00e5ff]/10"
      >
        [ RETURN TO MISSION CONTROL ]
      </Link>
    </div>
  );
}
