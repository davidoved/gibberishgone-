import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ adSlot = '1234567890', adFormat = 'auto' }) => {
  useEffect(() => {
    // Load AdSense script dynamically
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8446552009469150';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Initialize ads after script loads
    script.onload = () => {
      try {
        (globalThis as any).adsbygoogle = (globalThis as any).adsbygoogle || [];
        (globalThis as any).adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense initialization error:', e);
      }
    };

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector(
        'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8446552009469150"]'
      );
      if (existingScript && document.querySelectorAll('.adsbygoogle').length === 0) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-8">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8446552009469150"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSense;
