import { z } from 'zod';

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().optional(),
  size: z.string().optional(),
  description: z.string().optional()
});

export const MenuSchema = z.record(
  z.array(MenuItemSchema)
);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Menu = z.infer<typeof MenuSchema>;

export const categories = [
  { id: 'kampanya', label: 'Kampanya' },
  { id: 'yiyecekler', label: 'Yiyecekler' },
  { id: 'tatlilar', label: 'Tatlılar' },
  { id: 'klasik-kahveler', label: 'Kahveler' },
  { id: 'soguk-kahveler', label: 'Soğuk Kahveler' },
  { id: 'hars-matcha', label: 'Matcha' },
  { id: 'cay-ve-sicak-icecekler', label: 'Çay & Sıcak İçecekler' },
  { id: 'soguk-icecekler', label: 'Soğuk İçecekler' },
  { id: 'ekstralar', label: 'Ekstralar' }
] as const;

export type CategoryId = typeof categories[number]['id']; 