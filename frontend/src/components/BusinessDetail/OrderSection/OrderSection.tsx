import React, { useState } from 'react';
import { IBusiness } from '../../../redux/types/business';
import './OrderSection.css';
import { GoLinkExternal } from 'react-icons/go';
import { LiaDirectionsSolid } from 'react-icons/lia';

interface IOrderSectionProps {
    business: IBusiness | undefined;
}

const OrderSection: React.FC<IOrderSectionProps> = ({ business }) => {
    const [selectedTab, setSelectedTab] = useState<'Takeout' | 'Delivery'>('Delivery');

    return (
        <div className="order-sidebar">
            <div className="order-details">
                <h2 className="section-title">Order Food</h2>
                <div className="tabs">
                    {['Takeout', 'Delivery'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab as 'Takeout' | 'Delivery')}
                            className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {selectedTab === 'Delivery' && (
                    <div className="selected-tab">
                        <p className="delivery-header">
                            <strong>Free Delivery</strong> | $0 min | 30-40 mins
                        </p>
                        <input
                            type="text"
                            className="address-input"
                            placeholder="Delivery Address"
                        />
                        <button className="start-order-button">Start Order</button>
                    </div>
                )}
                {selectedTab === 'Takeout' && (
                    <div className="selected-tab">
                        <p className="takeout-header">
                            <strong>No Fees</strong> | Pick up in 5-15 mins
                        </p>

                        <button className="start-order-button">Start Order</button>
                    </div>
                )}
            </div>

            <div className="info-section">
                <div className="links">
                    <a className="info-link" href="">
                        Website
                    </a>
                    <span>
                        <GoLinkExternal size={16} />
                    </span>
                </div>
                <div className="links">
                    <div>
                        <a className="info-link" href="">
                            Get Directions
                        </a>
                        <div className="address">{business?.address}</div>
                    </div>
                    <span>
                        <LiaDirectionsSolid size={20} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderSection;
