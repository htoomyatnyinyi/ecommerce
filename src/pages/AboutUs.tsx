import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import ProductFeatures from "./ecommerce/ProductFeatures";
import ProductQuickView from "./ecommerce/ProductQuickView";

const AboutUs: React.FC = () => {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>Click Hove</HoverCardTrigger>
        <HoverCardContent>
          <Input type="email" placeholder="email" />
        </HoverCardContent>
      </HoverCard>
      <ProductFeatures />
      <ProductQuickView />
    </div>
  );
};

export default AboutUs;
