import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cart': 'Cart',
    'nav.search': 'Search products...',
    'nav.seeAll': 'See All',
    'nav.shopByBrand': 'Shop by Brand',
    'nav.language': 'العربية',
    
    // Home page
    'home.hero.title': 'Smart Technology Shop',
    'home.hero.subtitle': 'Your trusted partner for mobile phones and accessories in Lebanon',
    'home.featured': 'Featured Products',
    'home.categories': 'Shop by Category',
    'home.brands': 'Top Brands',
    
    // Categories
    'category.phones': 'Mobile Phones',
    'category.chargers': 'Chargers',
    'category.accessories': 'Accessories',
    'category.earphones': 'Earphones',
    'category.cases': 'Phone Cases',
    'category.screenProtectors': 'Screen Protectors',
    
    // Brands
    'brand.apple': 'Apple',
    'brand.samsung': 'Samsung',
    'brand.podoro': 'Podoro',
    'brand.greenLion': 'Green Lion',
    'brand.huawei': 'Huawei',
    'brand.xiaomi': 'Xiaomi',
    
    // Product
    'product.addToCart': 'Add to Cart',
    'product.price': 'Price',
    'product.colors': 'Available Colors',
    'product.description': 'Description',
    'product.outOfStock': 'Out of Stock',
    'product.brand': 'Brand',
    'product.category': 'Category',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.quantity': 'Quantity',
    'cart.remove': 'Remove',
    'cart.checkout': 'Checkout',
    'cart.customerInfo': 'Customer Information',
    'cart.name': 'Full Name',
    'cart.phone': 'Phone Number',
    'cart.city': 'City',
    'cart.payment': 'Payment Method',
    'cart.cash': 'Cash on Delivery',
    'cart.wishMoney': 'Wish Money',
    'cart.confirm': 'Confirm Order',
    'cart.placeOrder': 'Place Order',
    
    // Order
    'order.summary': 'Order Summary',
    'order.downloadPdf': 'Download PDF',
    'order.screenshot': 'Save Screenshot',
    'order.whatsapp': 'Send via WhatsApp',
    'order.customerInfo': 'Customer Information',
    'order.orderItems': 'Order Items',
    'order.totalAmount': 'Total Amount',
    'order.orderNumber': 'Order Number',
    'order.date': 'Date',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.email': 'Email',
    'admin.password': 'Password',
    'admin.loginBtn': 'Login',
    'admin.dashboard': 'Admin Dashboard',
    'admin.products': 'Products',
    'admin.addProduct': 'Add Product',
    'admin.editProduct': 'Edit Product',
    'admin.deleteProduct': 'Delete Product',
    'admin.orders': 'Recent Orders',
    'admin.totalProducts': 'Total Products',
    'admin.totalOrders': 'Total Orders',
    'admin.revenue': 'Revenue',
    
    // Common
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.prev': 'Previous',
    'common.close': 'Close',
    'common.viewAll': 'View All',
    'common.noResults': 'No results found',
    'common.sortBy': 'Sort by',
    'common.priceAsc': 'Price: Low to High',
    'common.priceDesc': 'Price: High to Low',
    'common.nameAsc': 'Name: A to Z',
    'common.nameDesc': 'Name: Z to A',
    'common.gridView': 'Grid View',
    'common.listView': 'List View',
    'common.continueShopping': 'Continue Shopping',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.cart': 'السلة',
    'nav.search': 'البحث عن المنتجات...',
    'nav.seeAll': 'عرض الكل',
    'nav.shopByBrand': 'تسوق حسب العلامة التجارية',
    'nav.language': 'English',
    
    // Home page
    'home.hero.title': 'متجر التكنولوجيا الذكية',
    'home.hero.subtitle': 'شريكك الموثوق للهواتف المحمولة والإكسسوارات في لبنان',
    'home.featured': 'المنتجات المميزة',
    'home.categories': 'تسوق حسب الفئة',
    'home.brands': 'أفضل العلامات التجارية',
    
    // Categories
    'category.phones': 'الهواتف المحمولة',
    'category.chargers': 'أجهزة الشحن',
    'category.accessories': 'الإكسسوارات',
    'category.earphones': 'سماعات الأذن',
    'category.cases': 'أغطية الهاتف',
    'category.screenProtectors': 'واقيات الشاشة',
    
    // Brands
    'brand.apple': 'آبل',
    'brand.samsung': 'سامسونغ',
    'brand.podoro': 'بودورو',
    'brand.greenLion': 'جرين ليون',
    'brand.huawei': 'هواوي',
    'brand.xiaomi': 'شاومي',
    
    // Product
    'product.addToCart': 'أضف إلى السلة',
    'product.price': 'السعر',
    'product.colors': 'الألوان المتاحة',
    'product.description': 'الوصف',
    'product.outOfStock': 'نفد من المخزون',
    'product.brand': 'العلامة التجارية',
    'product.category': 'الفئة',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'السلة فارغة',
    'cart.total': 'المجموع',
    'cart.quantity': 'الكمية',
    'cart.remove': 'إزالة',
    'cart.checkout': 'الدفع',
    'cart.customerInfo': 'معلومات العميل',
    'cart.name': 'الاسم الكامل',
    'cart.phone': 'رقم الهاتف',
    'cart.city': 'المدينة',
    'cart.payment': 'طريقة الدفع',
    'cart.cash': 'الدفع عند الاستلام',
    'cart.wishMoney': 'ويش موني',
    'cart.confirm': 'تأكيد الطلب',
    'cart.placeOrder': 'تأكيد الطلب',
    
    // Order
    'order.summary': 'ملخص الطلب',
    'order.downloadPdf': 'تحميل PDF',
    'order.screenshot': 'حفظ لقطة شاشة',
    'order.whatsapp': 'إرسال عبر الواتساب',
    'order.customerInfo': 'معلومات العميل',
    'order.orderItems': 'عناصر الطلب',
    'order.totalAmount': 'المبلغ الإجمالي',
    'order.orderNumber': 'رقم الطلب',
    'order.date': 'التاريخ',
    
    // Admin
    'admin.login': 'تسجيل دخول المدير',
    'admin.email': 'البريد الإلكتروني',
    'admin.password': 'كلمة المرور',
    'admin.loginBtn': 'تسجيل الدخول',
    'admin.dashboard': 'لوحة التحكم',
    'admin.products': 'المنتجات',
    'admin.addProduct': 'إضافة منتج',
    'admin.editProduct': 'تعديل المنتج',
    'admin.deleteProduct': 'حذف المنتج',
    'admin.orders': 'الطلبات الأخيرة',
    'admin.totalProducts': 'إجمالي المنتجات',
    'admin.totalOrders': 'إجمالي الطلبات',
    'admin.revenue': 'الإيرادات',
    
    // Common
    'common.search': 'البحث',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.prev': 'السابق',
    'common.close': 'إغلاق',
    'common.viewAll': 'عرض الكل',
    'common.noResults': 'لا توجد نتائج',
    'common.sortBy': 'ترتيب حسب',
    'common.priceAsc': 'السعر: من الأقل للأعلى',
    'common.priceDesc': 'السعر: من الأعلى للأقل',
    'common.nameAsc': 'الاسم: أ إلى ي',
    'common.nameDesc': 'الاسم: ي إلى أ',
    'common.gridView': 'عرض الشبكة',
    'common.listView': 'عرض القائمة',
    'common.continueShopping': 'متابعة التسوق',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};