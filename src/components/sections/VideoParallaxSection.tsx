export const VideoParallaxSection = () => {
  return (
    <section className="relative w-full">
      <video
        className="w-full h-auto"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src="https://res.cloudinary.com/djnkxndun/video/upload/v1771274865/skyscraper-and-airplane-2025-10-16-08-00-42-utc-v2-2_xfhwfv.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Text content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-regular text-white leading-tight">
            Intelligence that unlocks aircraft where they're needed most.
          </h2>
        </div>
      </div>
    </section>
  );
};
