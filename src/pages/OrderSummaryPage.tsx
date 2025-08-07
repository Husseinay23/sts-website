import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Camera, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

interface OrderData {
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
    selectedColor?: string;
  }>;
  customerInfo: {
    name: string;
    phone: string;
    city: string;
    street?: string;
    building?: string;
    floor?: string;
    landmark?: string;
  notes?: string;
    paymentMethod: 'cash' | 'whishMoney';
  };
  total: number;
}

const OrderSummaryPage: React.FC = () => {
  const { t } = useLanguage();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderId] = useState(() => 'STS-' + Date.now().toString(36).toUpperCase());

useEffect(() => {
  const savedOrder = localStorage.getItem('orderData');
  const alreadySent = localStorage.getItem('orderSent');

  if (savedOrder) {
    const parsed = JSON.parse(savedOrder);
    setOrderData(parsed);
    clearCart();

    if (!alreadySent) {
      // Build the WhatsApp message
      const message = `
🛍️ *New Order from STS*

📋 *Order Number:* STS-${Date.now().toString(36).toUpperCase()}

👤 *Customer Info:*
• Name: ${parsed.customerInfo.name}
• Phone: ${parsed.customerInfo.phone}
• City: ${parsed.customerInfo.city}
• Street: ${parsed.customerInfo.street || '-'}
• Building: ${parsed.customerInfo.building || '-'}
• Floor: ${parsed.customerInfo.floor || '-'}
• Landmark: ${parsed.customerInfo.landmark || '-'}
• Notes: ${parsed.customerInfo.notes || '-'}
• Payment: ${parsed.customerInfo.paymentMethod === 'cash' ? 'Cash' : 'Wish Money'}

🛒 *Items:*
${parsed.items.map((item: any) =>
  `• ${item.product.name}${item.selectedColor ? ` (${item.selectedColor})` : ''} - Qty: ${item.quantity} - $${item.product.price}`
).join('\n')}

💰 *Total: $${parsed.total.toFixed(2)}*
`.trim();

      const whatsappUrl = `https://wa.me/96178904118?text=${encodeURIComponent(message)}`;

      // Delay to bypass popup blockers
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        localStorage.setItem('orderSent', 'true');
      }, 1000); // 1 second delay
    }

  } else {
    navigate('/');
  }
}, [navigate, clearCart]);



  const handleDownloadPDF = () => {
    const element = document.getElementById('order-summary');
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: `order-${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

  const handleScreenshot = async () => {
    const element = document.getElementById('order-summary');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement('a');
      link.download = `order-${orderId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

 const handleWhatsApp = () => {
  if (!orderData) return;

  const {
    name,
    phone,
    city,
    paymentMethod,
    street,
    building,
    floor,
    landmark,
    notes,
  } = orderData.customerInfo;

  const message = `
🛍️ *New Order from STS*

📋 *${t('order.orderNumber')}:* ${orderId}

👤 *${t('order.customerInfo')}:*
• ${t('cart.name')}: ${name}
• ${t('cart.phone')}: ${phone}
• ${t('cart.city')}: ${city}
• ${t('cart.payment')}: ${paymentMethod === 'cash' ? t('cart.cash') : t('cart.wishMoney')}

📦 *${t('cart.deliveryInfo')}*:
${street ? `• ${t('street')}: ${street}` : ''}
${building ? `• ${t('building')}: ${building}` : ''}
${floor ? `• ${t('floor')}: ${floor}` : ''}
${landmark ? `• ${t('landmark')}: ${landmark}` : ''}
${notes ? `• ${t('notes')}: ${notes}` : ''}

🛒 *${t('order.orderItems')}:*
${orderData.items.map(item =>
  `• ${item.product.name}${item.selectedColor ? ` (${item.selectedColor})` : ''} - ${t('cart.quantity')}: ${item.quantity} - $${item.product.price}`
).join('\n')}

💰 *${t('order.totalAmount')}: $${orderData.total.toFixed(2)}*

${t('order.thankYouMessage')}
  `.trim();

  const whatsappUrl = `https://wa.me/96178904118?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};


  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
   
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>{t('order.downloadPdf')}</span>
          </button>
          <button
            onClick={handleScreenshot}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-colors shadow-lg"
          >
            <Camera className="w-5 h-5" />
            <span>{t('order.screenshot')}</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('order.whatsapp')}</span>
          </button>
        </div>

        {/* Order Summary */}
        <div id="order-summary" className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-500 text-white p-3 rounded-2xl shadow-lg">
                <span className="font-bold text-xl">STS</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Smart Technology Shop
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Lebanon's Premier Mobile & Tech Store
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('order.summary')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('order.orderNumber')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('order.date')}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
{/* Customer Info */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    {t('order.customerInfo')}
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">

    {/* Name */}
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.name')}</p>
      <p className="text-base text-gray-900 dark:text-white font-semibold">
        {orderData.customerInfo.name}
      </p>
    </div>

    {/* Phone */}
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.phone')}</p>
      <p className="text-base text-gray-900 dark:text-white font-semibold">
        {orderData.customerInfo.phone}
      </p>
    </div>

    {/* City */}
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.city')}</p>
      <p className="text-base text-gray-900 dark:text-white font-semibold">
        {orderData.customerInfo.city}
      </p>
    </div>

    {/* Payment Method with badge */}
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.payment')}</p>
      <div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            orderData.customerInfo.paymentMethod === 'cash'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}
        >
          {orderData.customerInfo.paymentMethod === 'cash'
            ? t('cart.cash')
            : t('cart.wishMoney')}
        </span>
      </div>
    </div>

    {/* Street */}
    {orderData.customerInfo.street && (
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.street')}</p>
        <p className="text-base text-gray-900 dark:text-white font-semibold">
          {orderData.customerInfo.street}
        </p>
      </div>
    )}

    {/* Building */}
    {orderData.customerInfo.building && (
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.building')}</p>
        <p className="text-base text-gray-900 dark:text-white font-semibold">
          {orderData.customerInfo.building}
        </p>
      </div>
    )}

    {/* Floor */}
    {orderData.customerInfo.floor && (
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.floor')}</p>
        <p className="text-base text-gray-900 dark:text-white font-semibold">
          {orderData.customerInfo.floor}
        </p>
      </div>
    )}

    {/* Landmark */}
    {orderData.customerInfo.landmark && (
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.landmark')}</p>
        <p className="text-base text-gray-900 dark:text-white font-semibold">
          {orderData.customerInfo.landmark}
        </p>
      </div>
    )}

    {/* Notes */}
    {orderData.customerInfo.notes && (
      <div className="space-y-1 sm:col-span-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('cart.notes')}</p>
        <p className="text-base text-gray-900 dark:text-white font-semibold">
          {orderData.customerInfo.notes}
        </p>
      </div>
    )}
  </div>
</div>


          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('order.orderItems')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Color
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Qty
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Price
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-xl"
                          />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {item.selectedColor || '-'}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                        ${item.product.price}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('order.totalAmount')}
              </span>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${orderData.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Thank you for choosing STS - Smart Technology Shop</p>
            <p>We'll contact you soon to confirm your order and delivery details.</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors"
          >
            {t('common.continueShopping')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;