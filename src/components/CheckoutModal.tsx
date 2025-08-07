import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerInfo {
  name: string;
  phone: string;
  city: string;
  street?: string;
  building?: string;
  floor?: string;
  landmark?: string;
  notes?: string;
  paymentMethod: 'cash' | 'whishMoney';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, clearCart, closeCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    city: '',
    street: '',
    building: '',
    floor: '',
    landmark: '',
    notes: '',
    paymentMethod: 'cash',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.city) {
      alert('Please fill in all required fields');
      return;
    }

    const orderData = {
      items: state.items,
      customerInfo,
      total: state.total,
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate('/order-summary');
    onClose();
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('cart.customerInfo')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Required Fields */}
            {[
              { label: 'cart.name', name: 'name', placeholder: 'Enter your full name' },
              { label: 'cart.phone', name: 'phone', placeholder: '+961 XX XXX XXX', type: 'tel' },
              { label: 'cart.city', name: 'city', placeholder: 'Beirut, Tripoli, Sidon...' },
            ].map(({ label, name, placeholder, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t(label)} *
                </label>
                <input
                  type={type}
                  required
                  value={(customerInfo as any)[name]}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, [name]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white transition-all"
                  placeholder={placeholder}
                />
              </div>
            ))}

            {/* Optional Fields */}
            {[
              { label: 'Street', name: 'street' },
              { label: 'Building', name: 'building' },
              { label: 'Floor', name: 'floor' },
              { label: 'Landmark (optional)', name: 'landmark' },
              { label: 'Notes (optional)', name: 'notes' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                <input
                  type="text"
                  value={(customerInfo as any)[name]}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, [name]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white transition-all"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('cart.payment')}
              </label>
              <select
                value={customerInfo.paymentMethod}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    paymentMethod: e.target.value as 'cash' | 'whishMoney',
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white transition-all"
              >
                <option value="cash">{t('cart.cash')}</option>
                <option value="wishMoney">{t('cart.wishMoney')}</option>
              </select>
            </div>

            {/* Order Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Order Summary</h3>
              <div className="space-y-2">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900 dark:text-white">{t('cart.total')}</span>
                    <span className="text-red-600 dark:text-red-400">${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
            >
              {t('cart.placeOrder')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
