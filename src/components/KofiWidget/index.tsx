import { useEffect } from 'react';

declare global {
  interface Window {
    kofiWidgetOverlay: {
      draw: (username: string, options: Record<string, string>) => void;
    };
  }
}

const SCRIPT_ID = 'kofi-overlay-script';

function drawWidget() {
  window.kofiWidgetOverlay.draw('tysontheember', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#2c1810',
    'floating-chat.donateButton.text-color': '#f5e6d3',
  });
}

export default function KofiWidget(): null {
  useEffect(() => {
    // Already loaded — just draw (handles StrictMode double-invoke)
    if (window.kofiWidgetOverlay) {
      drawWidget();
      return;
    }

    // Script tag already in DOM (e.g. StrictMode cleanup didn't run yet)
    if (document.getElementById(SCRIPT_ID)) {
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.onload = drawWidget;
    document.body.appendChild(script);
  }, []);

  return null;
}
