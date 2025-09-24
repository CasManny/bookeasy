"use client";
import { FC } from "react";
import {
  Features,
  Hero,
  Navigation,
  useGSAP,
  UserProviderFeatures,
} from "../components";

export const LandingPageView: FC = () => {
  useGSAP();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />
      <Hero />
      <Features />
      <UserProviderFeatures />
    </div>
  );
};
