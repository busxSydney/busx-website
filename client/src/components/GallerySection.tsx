import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Import gallery images
import scenicView1 from "../assets/gallery-renamed/scenic_view_1.jpeg";
import desertLandscape from "../assets/gallery-renamed/desert_landscape.jpeg";
import cityPanorama from "../assets/gallery-renamed/city_panorama.jpeg";
import touristGroup from "../assets/gallery-renamed/tourist_group.jpeg";
import beachResort from "../assets/gallery-renamed/beach_resort.jpeg";
import mountainView from "../assets/gallery-renamed/mountain_view.jpeg";
import culturalHeritage from "../assets/gallery-renamed/cultural_heritage.jpeg";
import roadTrip from "../assets/gallery-renamed/road_trip.jpeg";
import architecture from "../assets/gallery-renamed/architecture.jpeg";
import landmark from "../assets/gallery-renamed/landmark.jpeg";
import adventureTravel from "../assets/gallery-renamed/adventure_travel.jpeg";
import historicalSite from "../assets/gallery-renamed/historical_site.jpeg";
import natureLandscape from "../assets/gallery-renamed/nature_landscape.jpeg";
import busTravel from "../assets/gallery-renamed/bus_travel.jpeg";
import wildlifeSafari from "../assets/gallery-renamed/wildlife_safari.jpeg";
import luxuryTransport from "../assets/gallery-renamed/luxury_transport.jpeg";
import snowParty from "../assets/gallery-renamed/snow_party.jpeg";
import snowParty1 from "../assets/gallery-renamed/snow_party_1.jpeg";
import trip1 from "../assets/gallery-renamed/trip1.jpeg";
import trip2 from "../assets/gallery-renamed/trip2.jpeg";
import trip3 from "../assets/gallery-renamed/trip3.jpeg";
import trip4 from "../assets/gallery-renamed/trip4.jpeg";

// Import video files
import travelExperienceVideo from "../assets/gallery-renamed/travel_experience.mp4";
import tourHighlightsVideo from "../assets/gallery-renamed/tour_highlights.mp4";

// Create thumbnail images for videos
// We'll use existing images as thumbnails for videos
const travelExperienceThumbnail = culturalHeritage;
const tourHighlightsThumbnail = touristGroup;

// Define types for gallery items
interface GalleryItem {
  src: string;
  alt: string;
  type: "image" | "video";
  thumbnail?: string;
}

// Gallery items with both images and videos
const galleryItems: GalleryItem[] = [
  {
    src: culturalHeritage,
    alt: "Cultural Heritage",
    type: "image"
  },
  // {
  //   src: beachResort,
  //   alt: "Beach Resort",
  //   type: "image"
  // },
  // {
  //   src: mountainView,
  //   alt: "Mountain View",
  //   type: "image"
  // },
  // {
  //   src: adventureTravel,
  //   alt: "Adventure Travel",
  //   type: "image"
  // },
  // {
  //   src: roadTrip,
  //   alt: "Road Trip",
  //   type: "image"
  // },
  // {
  //   src: architecture,
  //   alt: "Architecture",
  //   type: "image"
  // },
  {
    src: landmark,
    alt: "Landmark",
    type: "image"
  },
  // {
  //   src: natureLandscape,
  //   alt: "Nature Landscape",
  //   type: "image"
  // },
  // {
  //   src: historicalSite,
  //   alt: "Historical Site",
  //   type: "image"
  // },
  // {
  //   src: luxuryTransport,
  //   alt: "Luxury Transport",
  //   type: "image"
  // },
  // {
  //   src: busTravel,
  //   alt: "Bus Travel",
  //   type: "image"
  // },
  {
    src: wildlifeSafari,
    alt: "Wildlife Safari",
    type: "image"
  },
  // {
  //   src: scenicView1,
  //   alt: "Scenic View",
  //   type: "image"
  // },
  {
    src: desertLandscape,
    alt: "Desert Landscape",
    type: "image"
  },
  {
    src: cityPanorama,
    alt: "City Panorama",
    type: "image"
  },
  {
    src: touristGroup,
    alt: "Tourist Group",
    type: "image"
  },
  {
    src: snowParty,
    alt: "Snow Party",
    type: "image"
  },
  {
    src: snowParty1,
    alt: "Snow Party 1",
    type: "image"
  },
  {
    src: trip1,
    type: "image",
    alt: "Trip"
  },
  {
    src: trip2,
    type: "image",
    alt: "Trip"
  },
  {
    src: trip3,
    type: "image",
    alt: "Trip"
  },
  {
    src: trip4,
    type: "image",
    alt: "Trip"
  },
  // {
  //   src: travelExperienceVideo,
  //   thumbnail: travelExperienceThumbnail,
  //   alt: "Travel Experience",
  //   type: "video"
  // },
  // {
  //   src: tourHighlightsVideo,
  //   thumbnail: tourHighlightsThumbnail,
  //   alt: "Tour Highlights",
  //   type: "video"
  // }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export function GallerySection() {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const autoChangeRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Auto-change preview every 5 seconds
    startAutoChange();
    
    return () => {
      if (autoChangeRef.current) {
        clearInterval(autoChangeRef.current);
      }
    };
  }, []);
  
  const startAutoChange = () => {
    if (autoChangeRef.current) {
      clearInterval(autoChangeRef.current);
    }
    
    autoChangeRef.current = window.setInterval(() => {
      setCurrentPreviewIndex(prev => (prev + 1) % galleryItems.length);
    }, 5000);
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentPreviewIndex(index);
    startAutoChange(); // Reset timer when user clicks
  };
  
  const openLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    // Pause auto-change when lightbox is open
    if (autoChangeRef.current) {
      clearInterval(autoChangeRef.current);
    }
  };
  
  const closeLightbox = () => {
    setLightboxItem(null);
    startAutoChange(); // Restart auto-change when lightbox is closed
  };

  const currentItem = galleryItems[currentPreviewIndex];

  return (
    <section id="gallery" className="py-20 bg-[#FFF8F2]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6"><span className="text-[#0D2E4D]">Joyful</span> <span className="text-[#FF8B00]">Memories</span></h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Explore some of the beautiful moments captured during our journeys. 
            Every trip with Bus X creates lasting memories.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Large Preview Window */}
          <motion.div 
            className="lg:w-3/5 bg-black rounded-xl overflow-hidden h-[260px] sm:h-[420px] lg:h-[500px] relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            onClick={() => openLightbox(currentItem)}
          >
            {currentItem.type === 'image' ? (
              <img 
                src={currentItem.src} 
                alt={currentItem.alt} 
                className="w-full h-full object-cover cursor-pointer"
              />
            ) : (
              <div className="relative w-full h-full">
                <video 
                  src={currentItem.src}
                  poster={currentItem.thumbnail}
                  className="w-full h-full object-cover cursor-pointer" 
                  controls
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#FF8B00]/80 flex items-center justify-center">
                    <i className="fas fa-play text-white text-xl"></i>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute left-6 bottom-6 z-10">
              <div className="flex flex-col items-start gap-1">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((dot) => (
                    <div key={dot} className="w-2 h-2 rounded-full bg-[#FF8B00]"></div>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white">{currentItem.alt}</h3>
              </div>
            </div>
          </motion.div>
          
          {/* Grid of Thumbnails */}
          <motion.div 
            className="lg:w-2/5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-2 gap-4 max-h-[260px] sm:max-h-[420px] lg:max-h-[500px] overflow-y-auto pr-2">
              {galleryItems.map((galleryItem, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className={`relative rounded-xl overflow-hidden bg-black cursor-pointer h-[120px] ${
                    currentPreviewIndex === index ? 'ring-2 ring-[#FF8B00]' : ''
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  {galleryItem.type === 'image' ? (
                    <img 
                      src={galleryItem.src} 
                      alt={galleryItem.alt} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img 
                        src={galleryItem.thumbnail} 
                        alt={galleryItem.alt} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#FF8B00]/80 flex items-center justify-center">
                          <i className="fas fa-play text-white text-xs"></i>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={!!lightboxItem} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <DialogTitle>
            <VisuallyHidden>Gallery Item</VisuallyHidden>
          </DialogTitle>
          {lightboxItem?.type === 'image' ? (
            <img 
              src={lightboxItem.src} 
              alt={lightboxItem.alt}
              className="w-full h-auto max-h-[80vh] object-contain bg-black"
            />
          ) : lightboxItem?.type === 'video' ? (
            <video 
              src={lightboxItem.src} 
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh] bg-black"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
