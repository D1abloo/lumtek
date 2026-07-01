import { MOUNTAINS_BG } from '../../data/heroAssets'

export const MountainBackdrop = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
    <img
      src={MOUNTAINS_BG}
      alt=""
      className="absolute inset-x-0 bottom-0 h-[64%] w-full object-cover object-bottom"
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#f2f8fd] from-[42%] via-[#f2f8fd]/75 via-[52%] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#f2f8fd]/20 via-transparent to-transparent" />
  </div>
)
