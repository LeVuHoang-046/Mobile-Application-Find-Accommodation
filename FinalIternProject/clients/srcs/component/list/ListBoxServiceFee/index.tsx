import { BoxServiceFee, BoxServiceFeeProps } from "@component/box";
import { Row } from "@component/layout";
import { scaler } from "@themes";
import React from "react";

type ListBoxServiceFeeProps = {
    list: BoxServiceFeeProps[],

}

export const ListBoxServiceFee: React.FC<ListBoxServiceFeeProps> = ({
    list,
}) => {
    return (
        <Row columnGap={scaler(10)} ml={scaler(15)} flexWrap="wrap" rowGap={scaler(10)} justify="flex-start">
            {list.map((item,index)=> (
                <BoxServiceFee
                key={`BoxServiceFee_${index}`}
                icon={item.icon}
                title={item.title}
                price={item.price}
                />
            ))}
        </Row>
    )
}