export type Property = {
	id: string;
	title: string;
	price: number;
	location: string;
	bedrooms: number;
	bathrooms: number;
	area: number;
	image: string;
	model3d?: string;
	description: string;
	featured: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CreatePropertyInput = Omit<
	Property,
	"id" | "createdAt" | "updatedAt"
>;

export type UpdatePropertyInput = Partial<CreatePropertyInput>;