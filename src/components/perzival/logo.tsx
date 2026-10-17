export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className="aura-fill grid size-7 place-items-center rounded-lg">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 12V2h4a3 3 0 0 1 0 6h-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">Perzival</span>
    </div>
  )
}
