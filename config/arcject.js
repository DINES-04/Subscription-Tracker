import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJECT_KEY } from "./env.js";

const aj = arcjet({
    
    key: ARCJECT_KEY,
    characteristics: ["ip.src"], 
    rules: [
      shield({ mode: "LIVE" }),   // Protects against DDoS attacks and brute force login attempts
    
      detectBot({
        mode: "DRY_RUN", // Blocks requests. Use "DRY_RUN" to log only
        // Block all bots except the following
        allow: [
          "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
          // Uncomment to allow these other common bot categories
          // See the full list at https://arcjet.com/bot-list
          //"CATEGORY:MONITOR", // Uptime monitoring services
          //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
        ],
      }),
      // Create a token bucket rate limit. Other algorithms are supported.
      tokenBucket({
        mode: "LIVE",
        refillRate: 5, // Refill 5 tokens per interval
        interval: 10, // Refill every 10 seconds
        capacity: 10, // Bucket capacity of 10 tokens

        // testing
        // refillRate: 0,   // 0 refill (for testing)
        // interval: 60,    // refill every 60 seconds (very slow refill)
        // capacity: 3,     // only 3 tokens
      }),
    ],
  });
  
  export default aj;