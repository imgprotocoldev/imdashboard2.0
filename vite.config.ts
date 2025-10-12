import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  build: {
    // Increase chunk size warning limit (we'll optimize chunks below)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunking strategy for better code splitting
        manualChunks: (id) => {
          // Vendor chunks - split by library
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Solana Web3 libraries
            if (id.includes('@solana') || id.includes('web3.js')) {
              return 'vendor-solana';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // Charts and visualization
            if (id.includes('apexcharts') || id.includes('recharts') || id.includes('@react-jvectormap')) {
              return 'vendor-charts';
            }
            // Calendar and date libraries
            if (id.includes('@fullcalendar') || id.includes('flatpickr')) {
              return 'vendor-calendar';
            }
            // UI libraries
            if (id.includes('swiper') || id.includes('simplebar') || id.includes('react-dnd')) {
              return 'vendor-ui';
            }
            // Everything else
            return 'vendor-misc';
          }
          
          // Application chunks - split by feature area
          // Dashboard pages
          if (id.includes('/pages/Dashboard/')) {
            return 'app-dashboard';
          }
          // Game pages
          if (id.includes('/pages/Hub') || id.includes('/pages/RaidGames') || id.includes('/pages/Raid')) {
            return 'app-games';
          }
          // Data pages
          if (id.includes('/pages/Harvesting') || id.includes('/pages/Distribution') || id.includes('/pages/Earnings')) {
            return 'app-data';
          }
          // Community pages
          if (id.includes('/pages/Events') || id.includes('/pages/Voting') || id.includes('/pages/Notifications')) {
            return 'app-community';
          }
          // User pages
          if (id.includes('/pages/UserProfiles') || id.includes('/pages/AccountSettings')) {
            return 'app-user';
          }
          // Auth pages
          if (id.includes('/pages/AuthPages/')) {
            return 'app-auth';
          }
        },
      },
    },
  },
});
