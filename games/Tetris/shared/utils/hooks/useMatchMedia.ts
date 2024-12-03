/**
 * Reference: https://usehooks-ts.com/react-hook/use-media-query
 * Usage: const matches = useMediaQuery('(min-width: 768px)')
 **/
import { useEffect, useLayoutEffect, useState } from 'react';

enum MEDIA_QUERY_LIST {
  PHONE = '(min-width: 425px)',
  TABLET = '(min-width: 768px)',
  DESKTOP = '(min-width: 1024px)',
  LARGE_DESKTOP = '(min-width: 1366px)',
  HD = '(min-width: 1920px)',
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useMediaQuery = (
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
  } = {},
): boolean => {
  const getMatches = (query: string): boolean => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    return window.matchMedia(MEDIA_QUERY_LIST[query]).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(MEDIA_QUERY_LIST[query]);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
