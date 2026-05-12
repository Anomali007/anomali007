import Image from "next/image";

interface HeroBannerProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function HeroBanner({ src, alt, priority = true }: HeroBannerProps) {
  return (
    <section className="relative -mb-8 overflow-hidden sm:-mb-16">
      <div className="relative aspect-[21/9] max-h-[60vh] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg" />
      </div>
    </section>
  );
}
