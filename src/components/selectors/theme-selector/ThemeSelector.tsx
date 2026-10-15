'use client';

import { setTheme } from '@/lib/features/themeSlice';
import { Theme } from '@/types/types';
import { useAppDispatch } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import DisplaySolid from './icons/DisplaySolid';
import MoonSolid from './icons/MoonSolid';
import SunSolid from './icons/SunSolid';

function ThemeSelector() {

  const [check, setCheck] = useState([false, true, false]);
  const isSystemTheme = check[1];
  const prefersColorSchemeRef = useRef<Theme>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: light)');
    prefersColorSchemeRef.current = mediaQueryList.matches ? 'light' : 'dark';

    function changeHandler(event: MediaQueryListEvent) {
      const mode = event.matches ? 'light' : 'dark';
      prefersColorSchemeRef.current = mode;
      if (isSystemTheme) dispatch(setTheme(mode));
    };

    mediaQueryList.addEventListener('change', changeHandler);
    return () => { mediaQueryList.removeEventListener('change', changeHandler) };

  }, [isSystemTheme, dispatch]);

  return (
    <fieldset className='theme-switcher'>
      <label
        htmlFor='set-light-theme'
        className='switch'
      >
        <input
          id="set-light-theme"
          className='option'
          type="radio"
          name="theme"
          value='light'
          checked={check[0]}
          onChange={() => {
            dispatch(setTheme('light'));
            setCheck([true, false, false]);
          }}
        />
        <SunSolid className='switch-icon' />
      </label>
      <label
        htmlFor='set-system-theme'
        className='switch'
      >
        <input
          id="set-system-theme"
          className='option'
          type="radio"
          name="theme"
          value='system'
          checked={check[1]}
          onChange={() => {
            if(prefersColorSchemeRef.current) {
              dispatch(setTheme(prefersColorSchemeRef.current));
              setCheck([false, true, false]);
            }
          }}
        />
        <DisplaySolid className='switch-icon' />
      </label>
      <label
        htmlFor='set-dark-theme'
        className='switch'
      >
        <input
          id="set-dark-theme"
          className='option'
          type="radio"
          name="theme"
          value='dark'
          checked={check[2]}
          onChange={() => {
            dispatch(setTheme('dark'));
            setCheck([false, false, true]);
          }}
        />
        <MoonSolid className='switch-icon' />
      </label>
    </fieldset>
  );

}

export default ThemeSelector;
