import { z } from "zod";

const optionSchema = z.object({
    value: z.string().min(1, 'Value is required'),
    label: z.string().min(1, 'Label is required'),
  });

export const AddBuildingDetailSchema = z.object({
    title: z.string().min(1,'Title is require'),
    address: z.string().min(1, 'Address is require'),
    roomType: z.object({
        label: z.string().min(1, 'Room type is require'),
        value: z.string().min(1, 'Room type is require'),
      }),
    parkingSpaces: z.string().nullable(),
    describe: z.string().nullable(),
    listAddRoom: z.array(z.any()).min(1, 'At least one room is required'),

  
})