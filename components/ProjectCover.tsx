import Image from 'next/image';

interface ProjectCoverProps {
  compact?: boolean;
}

export default function ProjectCover({ compact = false }: ProjectCoverProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-[#070b10] ${compact ? 'aspect-[16/9] w-full' : 'h-full'}`}
    >
      <Image
        src="/projects/convminds/cover.jpeg"
        alt=""
        fill
        priority={!compact}
        className="object-cover"
        sizes={compact ? '(max-width: 768px) 100vw, 33vw' : '100vw'}
      />
    </div>
  );
}
