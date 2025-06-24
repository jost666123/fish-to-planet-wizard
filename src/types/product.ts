
export interface Product {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  pddPrice: number;
  xiangyuPrice: number;
  profit: number;
  pddLink: string;
  xiangyuLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  title: string;
  description: string;
  coverImage?: string;
  pddPrice: number;
  xiangyuPrice: number;
  pddLink: string;
  xiangyuLink?: string;
}
