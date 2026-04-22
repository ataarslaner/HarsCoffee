import { z } from 'zod';

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  priceLabel: z.string().optional()
});

export const MenuSchema = z.record(
  z.array(MenuItemSchema)
);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Menu = z.infer<typeof MenuSchema>;

export const categories = [
  { id: 'kampanya', label: 'Kampanya' },
  { id: 'sandvic', label: 'Sandviç' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'firin', label: 'Fırın' },
  { id: 'bowl', label: 'Bowl' },
  { id: 'tatlilar', label: 'Tatlılar' },
  { id: 'sicak-espresso', label: 'Espresso' },
  { id: 'brew-bar', label: 'Brew Bar' },
  { id: 'sicak-matcha', label: 'Matcha' },
  { id: 'sicak-farkli', label: 'Farklı' },
  { id: 'caylar', label: 'Çaylar' },
  { id: 'soguk-kahve', label: 'Soğuk Kahve' },
  { id: 'limonata', label: 'Limonata' },
  { id: 'soguk-cay', label: 'Soğuk Çay' },
  { id: 'soguk-matcha', label: 'Matcha' },
  { id: 'soguk-farkli', label: 'Mılkshake' },
  { id: 'soguk-icecekler', label: 'Soğuk İçecekler' },
  { id: 'ekstra', label: 'Ekstra' },
] as const;

export type CategoryId = typeof categories[number]['id']; 