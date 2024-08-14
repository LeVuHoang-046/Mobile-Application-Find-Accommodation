import { Icons, Images } from "@assets";
import { useNavigation } from "@react-navigation/native";
import { FontSize, scaler } from "@themes";
import { TAppNavigation } from "@types";
import React, { memo, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStyles } from "react-native-unistyles";
import { Box, Row } from "@component/layout";
import { ImageApp } from "@component/media";
import { IconButton, TouchableApp } from "@component/forms";
import { TextApp } from "@component/typography";
import { stylesheet } from "./HeaderUserChat.style";
import { AvatarUser } from "@component/AvatarUser";
import { ColorsStatic } from "@constants";

type HeaderUserChatProps = {
    title?: string;
    isImageBg?: boolean;
    onPressLeft?: () => void;
    IconRight?: React.ReactNode;
    IconRightSecond?: React.ReactNode;
    onPressRight?: () => void;
    onPressRightSecond?: () => void;
    onPressUser?: () => void;
    goBack?: boolean;
    hideBorder?: boolean;
};

export const HeaderUserChat: React.NamedExoticComponent<HeaderUserChatProps> = memo(
    ({
        title,
        isImageBg = false,
        IconRight,
        IconRightSecond,
        goBack = false,
        hideBorder = false,
        onPressLeft,
        onPressRight,
        onPressRightSecond,
        onPressUser,
    }) => {
        const {
            styles,
            theme: { colors },
        } = useStyles(stylesheet)

        const navigation = useNavigation<TAppNavigation<any>>();
        const WidthIcon = useMemo(() => {
            return !!IconRightSecond ? scaler(75) : scaler(48)
        }, [IconRightSecond])
        return (
            <Box
                width={'100%'}
                color={colors.white}
                borderBottomWidth={ hideBorder ? 0 : isImageBg ? 0 : 1}
                borderBottomColor={ hideBorder? undefined : isImageBg ? undefined : colors.gray4}>
                {isImageBg ? (
                    <ImageApp source={Images.bgImg1} style={styles.image} />

                ) : null}
                <SafeAreaView edges={['top']} />
                <Row height={scaler(40)}>
                    <Row width={WidthIcon} height={'100%'}>
                        {navigation?.canGoBack() && goBack ? (
                            <IconButton
                                IconSvg={<Icons.ArrowLeft size={18} color={colors.black}/>}
                                stylePressable={styles.buttonIcon(true)}
                                height="100%"
                                onPress={() => {
                                    !!onPressLeft ? onPressLeft() : navigation.goBack();
                                }}
                            />
                        ) : null}
                    </Row>
                    <TouchableApp onPress={onPressUser} style={styles.buttonInfor}>
                        <Row columnGap={scaler(10)}>
                        <AvatarUser size={35}/>
                        <TextApp
                            weight={700}
                            size={FontSize.Font16}
                            textAlign="center"
                            color={isImageBg ? colors.white : colors.text}>
                            {title}
                        </TextApp>
                        </Row>
                    </TouchableApp>
                    <Row width={WidthIcon}>
                        {!!IconRightSecond ? (
                            <IconButton
                                IconSvg={IconRightSecond}
                                height="100%"
                                stylePressable={styles.buttonIcon(false)}
                                onPress={onPressRightSecond}
                                p={scaler(5)}
                            />
                        ) : null}
                        {!!IconRight ? (
                            <IconButton
                                IconSvg={IconRight}
                                height="100%"
                                stylePressable={styles.buttonIcon(false)}
                                onPress={onPressRight}
                                p={scaler(5)}
                                pr={scaler(12)}
                            />
                        ) : null}
                    </Row>
                </Row>
            </Box>
        )
    }
)