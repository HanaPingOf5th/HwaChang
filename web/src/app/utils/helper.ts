import React from "react";

export const filterChildrenByType = (children: React.ReactNode, elementType: React.ElementType) => {
  const childArray = React.Children.toArray(children);
  return childArray.filter((child) => React.isValidElement(child) && child.type === elementType);
};

const pastelColors = ['#FFA6C5', '#5EC75E', '#AAEBAA', '#37C3C3', '#0AC9FF', '#1E96FF', '#46BEFF'];
export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};
