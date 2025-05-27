import { useEffect, useState } from 'react';
import './HomePage.css';
import { IoRestaurant } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { MdNightlife } from 'react-icons/md';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';
import { FaCar } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';

const heroSlides = [
    {
        image: 'https://cdn.choosechicago.com/uploads/2022/06/13B9D6FA-A313-4521-8851-B25287A1E735-1-scaled-e1656533128290-1800x1350.jpeg',
        headline: 'Find your next favorite bite',
        placeholder: 'landscapers',
    },
    {
        image: 'https://www.robertlandscapes.com/wp-content/uploads/2023/11/Blog-image-Multi-Level-Garden-Design.jpg',
        headline: 'Show off your lawn this spring',
        placeholder: 'landscapers',
    },
    {
        image: 'https://www.atozvet.com/wp-content/uploads/2017/07/Prevention-and-Treatment-For-Pet-Disease-Midland-TX-scaled.jpg',
        headline: 'Trusted pet care near you',
        placeholder: 'groomers',
    },
];

const categories = [
    { name: 'Restaurants', icon: <IoRestaurant /> },
    { name: 'Shopping', icon: <FaShoppingCart /> },
    { name: 'Nightlife', icon: <MdNightlife /> },
    { name: 'Automotive', icon: <FaCar /> },
    { name: 'Beauty & Spas', icon: <FaWandMagicSparkles /> },
    { name: 'Home Services', icon: <IoHome /> },
];

export default function HomePage() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideIndex(i => (i + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentSlide = heroSlides[currentSlideIndex];

    return (
        <div className="home-page">
            <div className="hero" style={{ backgroundImage: `url(${currentSlide.image})` }}>
                <div className="hero-overlay">
                    <div className="hero-text">
                        <h1>{currentSlide.headline}</h1>
                    </div>
                    <div className="search-bar">
                        <button>
                            <span>
                                <CiSearch size={30} />
                            </span>
                            <span>{currentSlide.placeholder}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="categories">
                <h2>Categories</h2>
                <div className="category-grid">
                    {categories.map(cat => (
                        <div key={cat.name} className="category-card">
                            <div className="category-icon">{cat.icon}</div>
                            <div className="category-name">{cat.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
