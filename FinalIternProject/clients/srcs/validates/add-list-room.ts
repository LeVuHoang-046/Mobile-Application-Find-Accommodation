import z from 'zod';

const optionSchema = z.object({
  icon: z.function().args().returns(z.unknown()).optional(), // Adjust according to how you handle the icon
  label: z.string().min(1, 'Label is required'),
});

export const AddListRoomFormSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required'),
  roomPrice: z
    .union([z.string(), z.number()]) // Allow both string and number
    .refine(value => typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value))), {
      message: 'Room price must be a number greater than or equal to 1',
    })
    .transform(value => (typeof value === 'string' ? Number(value) : value)) // Transform string to number
    .refine(value => value >= 1, {
      message: 'Room price must be a number greater than or equal to 1',
    }),
  deposit: z
    .union([z.string(), z.number()]) // Allow both string and number
    .refine(value => typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value))), {
      message: 'Deposit must be a number greater than or equal to 1',
    })
    .transform(value => (typeof value === 'string' ? Number(value) : value))
    .refine(value => value >= 1, {
      message: 'Deposit must be a number greater than or equal to 1',
    }),
  area: z
    .union([z.string(), z.number()]) // Allow both string and number
    .refine(value => typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value))), {
      message: 'Area must be a number greater than or equal to 1',
    })
    .transform(value => (typeof value === 'string' ? Number(value) : value))
    .refine(value => value >= 1, {
      message: 'Area must be a number greater than or equal to 1',
    }),
  gender: z.object({
    label: z.string().nullable(),
  }),
  facilities: z.array(optionSchema).min(1, 'At least one facility is required'),
  interior: z.array(optionSchema).min(1, 'At least one interior type is required'),
  imageRoom: z.array(
    z.object({
      path: z.string().min(1, 'Image path is required'),
      mimeType: z.string().min(1, 'MIME type is required'),
    })
  ).min(1, 'At least one image is required'), // Require at least one image
});
