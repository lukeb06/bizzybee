import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateBusiness } from '../../redux/business';
import { IBusinessForm, ValidationErrors } from '../../redux/types/business';
import './CreateBusinessForm.css';
import { RootState, useAppSelector } from '../../redux/store';

interface ICreateBusinessError {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    description?: string;
    country?: string;
    priceRange?: string;
    featuredImage?: string;
    message?: string;
}

const CreateBusinessFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state: RootState) => state.session.user);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrls, setImageUrls] = useState(['', '']);
    const [errors, setErrors] = useState<ICreateBusinessError>({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        description: '',
        priceRange: '',
        featuredImage: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const validationErrors: ICreateBusinessError = {};
        if (!name) validationErrors.name = 'Business name is required';
        if (!address) validationErrors.address = 'Address is required';
        if (!city) validationErrors.city = 'City is required';
        if (!state) validationErrors.state = 'State is required';
        if (!zipcode) validationErrors.state = 'Zipcode is required';
        if (!country) validationErrors.country = 'Country is required';
        if (description.length < 30)
            validationErrors.description = 'Description needs 30 or more characters';
        if (!priceRange) validationErrors.priceRange = 'Price range is required';
        if (!featuredImage) validationErrors.featuredImage = 'Featured image URL is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const businessData: IBusinessForm = {
            owner_id: sessionUser!.id,
            name,
            address,
            city,
            state,
            country,
            zipcode,
            category,
            description,
            price_range: priceRange,
            featured_image: featuredImage,
            preview_image: previewImage,
            image_urls: imageUrls,
        };

        const newBusiness = await dispatch(thunkCreateBusiness(businessData));

        if (newBusiness) {
            // navigate('/');
            navigate(`/business/${newBusiness.id}`);
        } else {
            setErrors({ message: 'Failed to create business. Please try again.' });
        }
    };

    const autoFill = () => {
        setName('Pauli');
        setCountry('United States');
        setAddress('65 Salem St');
        setState('MA');
        setCity('Boston');
        setZipcode('02113');
        setCategory('takeout');
        setDescription(
            'Our menu features a wide variety of sandwiches, lobster rolls, salads, wraps, breakfast items, pastas, burgers and entrees sure to please any customer.',
        );
        setPriceRange('2');
        setFeaturedImage(
            'https://www.ameliaisland.com/wp-content/uploads/2024-Amelia-Masons-Famous-Lobster-Rolls-031A-Deremer-Studios-LLC.jpg',
        );
        setPreviewImage('https://s3-media0.fl.yelpcdn.com/bphoto/3KQWr3Bd7TFb6Wd4BraDkg/o.jpg');
        setImageUrls([
            'https://s3-media0.fl.yelpcdn.com/bphoto/3KQWr3Bd7TFb6Wd4BraDkg/o.jpg',
            'https://s3-media0.fl.yelpcdn.com/bphoto/3KQWr3Bd7TFb6Wd4BraDkg/o.jpg',
        ]);
    };

    return (
        <form onSubmit={handleSubmit} className="create-business-container">
            <h2>Create a new Business</h2>
            <div className="business-form">
                <section className="title-section">
                    <h3>Hello! Let&apos;s start with your business name</h3>
                    <label>
                        <span>
                            Add your business name so that we can help you claim your Yelp Page.
                        </span>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your Business Name"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </label>
                    <label>
                        <div>
                            <p>What kind of business are you in?</p>{' '}
                            <p>
                                Help customers find your product and service. You can add up to 3
                                categories that best describe what your business&apos;s core
                                business is. You can always edit and add more later.
                            </p>
                        </div>
                        <input
                            type="text"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            placeholder="Business Categories"
                        />
                    </label>
                </section>

                <section className="location-section">
                    <h3>What is your business address?</h3>
                    <p>
                        Enter the address for where customers can find you or your registered
                        business address.
                    </p>
                    <label>
                        <div className="label-row">
                            <span>Street Address </span>
                            {errors.address && (
                                <span className="error-message">{errors.address}</span>
                            )}
                        </div>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Street Address"
                        />
                    </label>
                    <div className="city-state">
                        <label>
                            <div className="label-row">
                                <span>City </span>
                                {errors.city && (
                                    <span className="error-message">{errors.city}</span>
                                )}
                            </div>
                            <input
                                className="input-box-city"
                                type="text"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </label>
                        <label>
                            <div className="label-row">
                                <span>State </span>
                                {errors.state && (
                                    <span className="error-message">{errors.state}</span>
                                )}
                            </div>
                            <input
                                className="input-box-state"
                                type="text"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                placeholder="STATE"
                            />
                        </label>
                    </div>
                    <div className="zipcode-country">
                        <label>
                            <div className="label-row">
                                <span>Zipcode </span>
                                {errors.zipcode && (
                                    <span className="error-message">{errors.zipcode}</span>
                                )}
                            </div>
                            <input
                                className="input-box-city"
                                type="text"
                                value={zipcode}
                                onChange={e => setZipcode(e.target.value)}
                                placeholder="Zip"
                            />
                        </label>
                        <label>
                            <div className="label-row">
                                <span>Country </span>
                                {errors.country && (
                                    <span className="error-message">{errors.country}</span>
                                )}
                            </div>
                            <input
                                className="input-box-state"
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="USA"
                            />
                        </label>
                    </div>
                </section>

                <section className="description-section">
                    <h3>Describe your business to customers</h3>
                    <p>
                        Describe what makes your business unique — services, atmosphere, or special
                        features. Minimum 30 characters.
                    </p>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                    />
                    {errors.description && (
                        <span className="error-message">{errors.description}</span>
                    )}
                </section>

                <section className="price-section">
                    <h3>Price Range (1-5) *</h3>
                    <p>
                        Select a number that best reflects your typical pricing. 1 =
                        Budget-friendly, 5 = High-end/luxury.
                    </p>
                    <select
                        id="price_range"
                        name="price_range"
                        required
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                    {errors.priceRange && (
                        <span className="error-message">{errors.priceRange}</span>
                    )}
                </section>

                <section className="image-section">
                    <h3>Share your business photos</h3>
                    <p>Add images to showcase your business — food, services, ambiance, etc.</p>
                    <input
                        type="text"
                        value={featuredImage}
                        onChange={e => setFeaturedImage(e.target.value)}
                        placeholder="Featured Image URL"
                    />
                    {errors.featuredImage && (
                        <span className="error-message">{errors.featuredImage}</span>
                    )}
                    <input
                        type="text"
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL"
                    />

                    {[0, 1].map(index => (
                        <input
                            key={index}
                            type="text"
                            value={imageUrls[index]}
                            onChange={e => {
                                const newImageUrls = [...imageUrls];
                                newImageUrls[index] = e.target.value;
                                setImageUrls(newImageUrls);
                            }}
                            placeholder="Image URL"
                        />
                    ))}
                </section>
                <div className="buttons">
                    <button type="submit" className="create-business-button">
                        Create Business
                    </button>
                    <button className="autofill-button" type="button" onClick={autoFill}>
                        AutoFill
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreateBusinessFormPage;
