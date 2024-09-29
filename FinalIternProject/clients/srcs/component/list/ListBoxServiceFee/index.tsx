import { BoxServiceFee, BoxServiceFeeProps } from "@component/box";
import { TouchableApp } from "@component/forms";
import { Row } from "@component/layout";
import { scaler } from "@themes";
import { FormsAddMoreService } from "@types";
import React from "react";

type ListBoxServiceFeeProps = {
  list: BoxServiceFeeProps[],   // UI representation of service fees
  services: FormsAddMoreService[], // Actual data for services
  onPress?: (item: FormsAddMoreService) => void, // Expect a FormsAddMoreService object
}

export const ListBoxServiceFee: React.FC<ListBoxServiceFeeProps> = ({
  list,
  services,
  onPress
}) => {
  return (
    <Row columnGap={scaler(10)} ml={scaler(15)} flexWrap="wrap" rowGap={scaler(10)} justify="flex-start">
      {services.map((service, index) => (
        <TouchableApp key={`Service_${index}`} onPress={() => onPress && onPress(service)}>
          <BoxServiceFee
            icon={list[index]?.icon}
            title={list[index]?.title}
            price={list[index]?.price}
          />
        </TouchableApp>
      ))}
    </Row>
  );
};
