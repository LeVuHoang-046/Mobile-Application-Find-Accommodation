import { Box, ButtonChooseCityProps, ModalAppDetail, ModalAppDetailRef, Row, TextApp } from "@component";
import { LineApp } from "@component/LineApp";
import { BoxButtonChooseCity } from "@component/box/BoxButtonChooseCity";
import { FontSize } from "@themes";
import { ForwardRefComponent } from "@types";
import { forwardRef, useImperativeHandle, useRef } from "react";
export type ModalDetailSearchForNewsProps = {
    show: () => void;
}

export const ModalDetail: ForwardRefComponent<ModalDetailSearchForNewsProps,{}> = forwardRef(({},ref) => {
    useImperativeHandle(
        ref,
        () => ({
          show,
        }),
        [],
      );

    const show = () => {
      modalRef.current?.show();
    }
  
  const modalRef = useRef<ModalAppDetailRef>(null);

  const buttons: ButtonChooseCityProps[] = [
    {
        label: 'All'
    },
    {
      label:'Ha Noi city'
    },
    {
      label: 'Ho Chi Minh Minh city'
    },
    {
        label: 'Da Nang city'
    }
  ]


  return (
    <ModalAppDetail ref={modalRef}>
      <Box width={'100%'}>
        <Box align="center">
          <Row>
            <TextApp size={FontSize.Font16} weight={700}>Province/City</TextApp>
          </Row>
        </Box>
        <LineApp/>
        <BoxButtonChooseCity buttons={buttons} key={'button'}/>
      </Box>
    </ModalAppDetail>
  );
});