export type PropertyFormState = {
  title: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  image: string;
  model3d: string;
  description: string;
  featured: boolean;
};

export type FeedbackState = {
  type: "success" | "error";
  text: string;
} | null;