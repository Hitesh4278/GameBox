import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const CarouselComponent = () => {
  return (
    <div style={{ marginTop: '2px' }}>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
      >
        <div>
          <img src="https://source.unsplash.com/random/267x100/?music" alt="First slide" />
        </div>
        <div>
          <img src="https://source.unsplash.com/random/267x100/?song" alt="Second slide" />
        </div>
        <div>
          <img src="https://source.unsplash.com/random/267x100/?songs" alt="Third slide" />
        </div>
      </Carousel>
    </div>
  );
};
