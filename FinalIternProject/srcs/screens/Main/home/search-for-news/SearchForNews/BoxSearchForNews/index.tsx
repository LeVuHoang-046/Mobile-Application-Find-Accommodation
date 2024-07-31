import { BoxInformationVertical, BoxInformationVerticalProps, Row } from "@component";
import { ColorsStatic } from "@constants";
import { scaler } from "@themes";
import { memo } from "react";

type BoxSearchForNewsProps = {
    item: any
};

export const BoxSearchForNews: React.NamedExoticComponent<BoxSearchForNewsProps> = memo(({item}) => {
    const list: BoxInformationVerticalProps[] = [
        {
          time: '1 hours ago',
          tilte: 'Đường Láng phòng đẹp sáng giá tốt',
          price: '4.500.000đ/tháng',
          location:
            '29 Dịch Vọng, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội',
          district: 'Quận Cầu Giấy',
          buildingName: 'Số/tên phòng: 404',
          area: '30m2',
          numberPeople: '4',
        },
      ];
    return (
        <>
        {list.map((_,index) => (
            <BoxInformationVertical styleOther={{color: ColorsStatic.gray10}} {..._} key={`BoxSearchForNews_${index}`}/>
        ))}
        </>
    )
})