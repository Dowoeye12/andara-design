import { Button } from "../ui/button";
import { BackgroundGrid } from "../BackgroundGrid";
import { SectionContainer } from "../SectionContainer";
import { CONTENT } from "@/lib/content";
import { useState, useRef, useEffect } from "react";
import { ArrowDownSolidIcon } from "../ui/icons/heroicons-arrow-down-solid";

export const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const video4Ref = useRef<HTMLVideoElement>(null);

  const videos = [
    "https://res.cloudinary.com/djnkxndun/video/upload/v1771274816/20251018_1540_New_Video_simple_compose_01k7vw81x2ft181a757r433kdw-2_him17m.mp4",
    "https://res.cloudinary.com/djnkxndun/video/upload/v1771274816/20251018_1540_New_Video_simple_compose_01k7vw81rxe24stctv55mpbbgp-2_ma10yj.mp4",
    "https://res.cloudinary.com/djnkxndun/video/upload/v1771274815/1472661_People_Business_3840x2160_1_v3-2_wsuipb.mp4",
    "https://res.cloudinary.com/djnkxndun/video/upload/v1771274864/cockpit_urhcsd-2_rgmak9.mp4"
  ];

  const scrollToNextSection = () => {
    // Scroll to the next section (VisionSection) which is at viewport height
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    // Preload all videos
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    const video3 = video3Ref.current;
    const video4 = video4Ref.current;
    
    if (video1 && video2 && video3 && video4) {
      video1.load();
      video2.load();
      video3.load();
      video4.load();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ensure the current video is playing
    const currentVideo = currentVideoIndex === 0 ? video1Ref.current : 
                        currentVideoIndex === 1 ? video2Ref.current : 
                        currentVideoIndex === 2 ? video3Ref.current : video4Ref.current;
    
    // Pause all videos first
    if (video1Ref.current) video1Ref.current.pause();
    if (video2Ref.current) video2Ref.current.pause();
    if (video3Ref.current) video3Ref.current.pause();
    if (video4Ref.current) video4Ref.current.pause();
    
    // Play the current video
    if (currentVideo) {
      currentVideo.play();
    }
  }, [currentVideoIndex]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video 1 */}
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: currentVideoIndex === 0 ? 1 : 0 }}
      >
        <source src={videos[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video 2 */}
      <video
        ref={video2Ref}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: currentVideoIndex === 1 ? 1 : 0 }}
      >
        <source src={videos[1]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video 3 */}
      <video
        ref={video3Ref}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: currentVideoIndex === 2 ? 1 : 0 }}
      >
        <source src={videos[2]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video 4 - Cockpit */}
      <video
        ref={video4Ref}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: currentVideoIndex === 3 ? 1 : 0 }}
      >
        <source src={videos[3]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content with Parallax Effect */}
      <div 
        className="relative z-20 text-center max-w-6xl mx-auto px-6 lg:px-12 animate-fade-in"
        style={{
          transform: `translateY(${-scrollY * 0.5}px)`,
          opacity: Math.max(0, 1 - scrollY / window.innerHeight)
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter mb-4 sm:mb-6 text-white leading-tight">
          {CONTENT.hero.headline}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 leading-relaxed px-2">
          {CONTENT.hero.subheadline}
        </p>
      </div>

      {/* Scroll Down Arrow with Parallax */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          transform: `translate(-50%, ${scrollY * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollY / (window.innerHeight * 0.5))
        }}
      >
        <button
          onClick={scrollToNextSection}
          className="text-white/80 hover:text-white transition-colors duration-300"
          style={{
            animation: 'subtle-bounce 2s ease-in-out infinite'
          }}
          aria-label="Scroll to next section"
        >
          <ArrowDownSolidIcon className="w-6 h-6" fill="white" stroke="none" />
        </button>
      </div>
    </section>
  );
};
