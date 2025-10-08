import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Find CSS rules
    if (config.module && config.module.rules) {
      // We'll just skip type checking with a simple method
      
      // Add our custom rule for stablepay-sdk CSS
      config.module.rules.push({
        test: /\.css$/i,
        include: /node_modules\/stablepay-sdk/,
        // Using simple string loaders to avoid type issues
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            sourceMap: false,
            import: false
          }
        }]
      });
      
      // Type assertion to avoid TypeScript errors
      const rules = config.module.rules as any[];
      
      // Try to find and modify any CSS rules
      for (const rule of rules) {
        // Skip if not an object
        if (typeof rule !== 'object' || !rule) continue;
        
        // Check if this is a CSS rule
        if (rule.test && rule.test.toString && rule.test.toString().includes('css')) {
          // Add exclusion for stablepay-sdk
          if (!rule.exclude) {
            rule.exclude = [/node_modules\/stablepay-sdk/];
          } else if (Array.isArray(rule.exclude)) {
            rule.exclude.push(/node_modules\/stablepay-sdk/);
          } else {
            rule.exclude = [rule.exclude, /node_modules\/stablepay-sdk/];
          }
        }
      }
    }
    
    return config;
  },
};

export default nextConfig;