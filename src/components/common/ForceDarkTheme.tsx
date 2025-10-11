import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ForceDarkThemeProps {
  children: React.ReactNode;
}

/**
 * Component that forces dark theme for its children
 * Useful for specific pages that should always be dark
 */
export const ForceDarkTheme: React.FC<ForceDarkThemeProps> = ({ children }) => {
  const { setDarkTheme } = useTheme();

  useEffect(() => {
    // Force dark theme when this component mounts
    setDarkTheme();
  }, [setDarkTheme]);

  return <>{children}</>;
};

export default ForceDarkTheme;
