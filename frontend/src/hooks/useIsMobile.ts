import { useEffect, useState } from 'react';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;