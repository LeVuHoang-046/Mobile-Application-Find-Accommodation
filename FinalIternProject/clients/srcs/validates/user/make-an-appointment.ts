import { DefaultErrorForm } from "@constants";
import { FormsMakeAnAppointment } from "@types";
import { Resolver } from "react-hook-form";


export const resolverMakeAnAppointment: Resolver<
  FormsMakeAnAppointment
> = async (values: FormsMakeAnAppointment) => {
  const {
    time,
  } = values;

  let errors = {};
  if (!time) {
    errors = {
      ...errors,
      time: DefaultErrorForm,
    };
  };
  return {
    values,
    errors,
  };
}