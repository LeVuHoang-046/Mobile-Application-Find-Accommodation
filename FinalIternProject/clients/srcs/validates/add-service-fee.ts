import { z } from 'zod';

const optionSchema = z.object({
    value: z.string().min(1, 'Value is required'),
    label: z.string().min(1, 'Label is required'),
  });

export const AddServiceFeeFormSchema = z.object({
  nameService: z.string().min(1, 'Service name is required'),
  serviceFee: z
  .string()
  .transform(value => (value ? Number(value) : null))
  .refine(value => value === null || (!isNaN(value) && value >= 1), {
    message: 'Service fee must greater than or equal to 1',
  }),
  feeBase: optionSchema,
  iconService: z
  .string()
  .nullable()
  .refine(value => value !== null && value.length > 0, {
    message: 'Icon service is required',
  }),
  unit: z.string().min(1, 'Measurement unit is required'), 
  note: z.string().nullable(), 
});
