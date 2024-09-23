import z from 'zod';

const optionSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
});

export const AddListRoomFormSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required'),
  roomPrice: z
    .string()
    .transform(value => (value ? Number(value) : null))
    .refine(value => value === null || (!isNaN(value) && value >= 1), {
      message: 'Room price must be a number greater than or equal to 1',
    }),
  deposit: z
    .string()
    .transform(value => (value ? Number(value) : null))
    .refine(value => value === null || (!isNaN(value) && value >= 1), {
      message: 'Deposit must be a number greater than or equal to 1',
    }),
  imageRoom: z
    .array(
      z.object({
        path: z.string(),
        mime: z.string(),
        size: z.number(),
        width: z.number(),
        height: z.number(),
      }),
    )
    .nullable(),
  videoRoom: z
    .array(
      z.object({
        path: z.string(),
      }),
    )
    .nullable(),
  area: z
    .string()
    .transform(value => (value ? Number(value) : null))
    .refine(value => value === null || (!isNaN(value) && value >= 1), {
      message: 'Area must be a number greater than or equal to 1',
    }),
  floor: z.number().nullable(),
  capacity: z.number().nullable(),
  gender: z.object({
    label: z.string().nullable(),
    value: z.string().nullable(),
  }),
  facilities: z.array(optionSchema).min(1, 'At least one facility is required'),
  interior: z
    .array(optionSchema)
    .min(1, 'At least one interior type is required'),
});
