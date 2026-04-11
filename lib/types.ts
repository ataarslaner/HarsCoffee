import { z } from 'zod';

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().optional()
});

export const MenuSchema = z.record(
  z.array(MenuItemSchema)
);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Menu = z.infer<typeof MenuSchema>;

export const categories = [
  { id: 'yiyecekler', label: 'Yiyecekler' },
  { id: 'tatlilar', label: 'Tatlılar' },
  { id: 'hars-summer-edition', label: 'Summer 🧊' },
  { id: 'soguk-icecekler', label: 'İçecekler' },
  { id: 'soguk-kahveler', label: 'Soğuk Kahveler' },
  { id: 'hars-matcha', label: 'Matcha' },
  { id: 'klasik-kahveler', label: 'Kahveler' },
  { id: 'cay-ve-turk-kahvesi', label: 'Çay & Türk Kahvesi' }
] as const;

export type CategoryId = typeof categories[number]['id']; 