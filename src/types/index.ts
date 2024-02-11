import React from "react";

export interface IAppRoute {
  path: string;
  element: React.ReactNode;
}

export interface IChildren {
  children: React.ReactNode;
}
export interface ITrendingCard {
  bgImage?: any;
  title: string;
  year: number | string;
  category: string;
  rating: string;
  isBookMarked: boolean;
}
