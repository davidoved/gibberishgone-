import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ adSlot = '1234567890', adFormat = 'auto' }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const w = globalThis as any;
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense push error:', e);
    }
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
