import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from 'react-slick';
import { Container } from 'react-bootstrap';
import './Home.css';

const Home: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200, // For large screens (desktops)
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992, // For tablets and medium screens
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // For mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Header />
      <Container fluid className="mt-5">
        <h1 className="text-center">Welcome to Our Project</h1>
        <p className="lead text-center">Explore our gallery below.</p>

        {/* Slick Carousel */}
        <Slider {...settings}>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/images/66f5cba7753adf99c6b9795e_Blog - The Ideal Number of Product Images_01.jpg"
              alt="Ad 1"
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }} // Ensures image is responsive and centered
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/images/product-images-for-ecommerce-websites.jpg"
              alt="Ad 2"
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }} // Ensures image is responsive and centered
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/images/istockphoto-1446319619-612x612.jpg"
              alt="Ad 3"
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }} // Ensures image is responsive and centered
            />
          </div>
        </Slider>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
};

export default Home;
