import { ReactNode, useEffect, useRef, useState } from "react";

const HERO_VIDEOS = [
  "https://res.cloudinary.com/djnkxndun/video/upload/v1771274816/20251018_1540_New_Video_simple_compose_01k7vw81x2ft181a757r433kdw-2_him17m.mp4",
  "https://res.cloudinary.com/djnkxndun/video/upload/v1771274816/20251018_1540_New_Video_simple_compose_01k7vw81rxe24stctv55mpbbgp-2_ma10yj.mp4",
  "https://res.cloudinary.com/djnkxndun/video/upload/v1771274815/1472661_People_Business_3840x2160_1_v3-2_wsuipb.mp4",
  "https://res.cloudinary.com/djnkxndun/video/upload/v1771274864/cockpit_urhcsd-2_rgmak9.mp4",
];

interface VideoHeroBackgroundProps {
  children: ReactNode;
  className?: string;
  videos?: string[];
}

export const VideoHeroBackground = ({
  children,
  className = "",
  videos = HERO_VIDEOS,
}: VideoHeroBackgroundProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => video?.load());
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentVideoIndex) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, [currentVideoIndex]);

  return (
    <section
      className={`relative h-screen flex items-center overflow-hidden ${className}`}
    >
      {videos.map((videoUrl, index) => (
        <video
          key={videoUrl}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          autoPlay
          muted
          playsInline
          loop={videos.length === 1}
          onEnded={() => {
            if (videos.length > 1) {
              setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
          style={{ opacity: currentVideoIndex === index ? 1 : 0 }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ))}
      <div className="absolute inset-0 bg-black/45 z-10" />
      <div className="relative z-20 w-full">{children}</div>
    </section>
  );
};
