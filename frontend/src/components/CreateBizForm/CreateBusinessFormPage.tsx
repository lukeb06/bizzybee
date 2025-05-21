import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateBusiness } from '../../redux/business';
import { IBusiness, IBusinessForm, ValidationErrors } from '../../redux/types/business';
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
    previewImage?: string;
    submit?: string;
}

const CreateBusinessFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state: RootState) => state.session.user);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [priceRange, setPriceRange] = useState('0');
    const [previewImage, setPreviewImage] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [imageUrls, setImageUrls] = useState(['', '', '', '']);
    const [lat, setLat] = useState('0');
    const [lng, setLng] = useState('0');
    const [errors, setErrors] = useState<ICreateBusinessError>({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        description: '',
        priceRange: '',
        previewImage: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            description: '',
            priceRange: '',
            previewImage: '',
        });
        const validationErrors: ValidationErrors = {};
        if (!name) validationErrors.name = 'Business name is required';
        if (!address) validationErrors.address = 'Address is required';
        if (!city) validationErrors.city = 'City is required';
        if (!state) validationErrors.state = 'State is required';
        if (!country) validationErrors.country = 'Country is required';
        if (description.length < 30)
            validationErrors.description = 'Description needs 30 or more characters';
        if (!priceRange) validationErrors.priceRange = 'Price per night is required';
        if (!previewImage) validationErrors.previewImage = 'Preview image URL is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const businessData: IBusinessForm = {
            owner_id: sessionUser!.id,
            name,
            country,
            address,
            city,
            state,
            zipcode,
            category,
            description,
            price_range: priceRange,
            preview_image: previewImage,
            featured_image: featuredImage,
            image_urls: imageUrls,
            lat,
            lng,
        };

        // console.log(spotData, 'THIS IS THE NEW SPOT DATA');

        const newBusiness = await dispatch(thunkCreateBusiness(businessData));

        if (newBusiness) {
            navigate(`/business/${newBusiness.id}`);
        } else {
            setErrors({ submit: 'Failed to create spot. Please try again.' });
        }
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

                    {/* <label>
                        <div className="label-row">
                            <span>
                                Give customers a phone number so they can call your business
                            </span>{' '}
                        </div>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Business Phone Number"
                        />
                    </label> */}
                    {/* <label>
                        <div className="label-row">
                            <span>Do you have a business website?</span>{' '}
                        </div>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Website (optional)"
                        />
                    </label> */}
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
                            placeholder="Street Address (optional)"
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
                    <div className="lat-lng">
                        <label>
                            <span className="label-row">Latitude {''}</span>
                            <input
                                className="input-box-lat"
                                type="text"
                                value={lat}
                                onChange={e => setLat(e.target.value)}
                                placeholder="Latitude"
                            />
                        </label>
                        <label>
                            <span className="label-row">Longitude {''}</span>
                            <input
                                className="input-box-lng"
                                type="text"
                                value={lng}
                                onChange={e => setLng(e.target.value)}
                                placeholder="Longitude"
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
                        // size={10}
                        // rows={1}
                        // type="text"
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
                        onChange={(e) => setPriceRange(e.target.value)}
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
                    <h3>Liven up your business with photos</h3>
                    <p>Add images to showcase your business — food, services, ambiance, etc.</p>
                    <input
                        type="text"
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL"
                    />
                    {errors.previewImage && (
                        <span className="error-message">{errors.previewImage}</span>
                    )}
                    {[0, 1, 2, 3].map(index => (
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
                <button type="submit" className="create-business-button">
                    Create Business
                </button>
            </div>
        </form>
    );
};

export default CreateBusinessFormPage;
