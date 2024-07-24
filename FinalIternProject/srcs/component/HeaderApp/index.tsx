import { Icons, Images } from "@assets";
import { useNavigation } from "@react-navigation/native";
import { FontSize, scaler } from "@themes";
import { TAppNavigation } from "@types";
import React, { memo, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./HeaderApp.style";
import { Box, Row } from "@component/layout";
import { ImageApp } from "@component/media";
import { IconButton } from "@component/forms";
import { TextApp } from "@component/typography";

type HeaderAppProps = {
    title?: string;
    isImageBg?: boolean;
    onPressLeft?: () => void;
    IconRight?: React.FunctionComponent<any>;
    IconRightSecond?: React.FunctionComponent<any>;
    onPressRight?: () => void;
    onPressRightSecond?: () => void;
    goBack?: boolean;
};

export const HeaderApp: React.NamedExoticComponent<HeaderAppProps> = memo(
    ({
        title,
        isImageBg = false,
        IconRight,
        IconRightSecond,
        goBack = false,
        onPressLeft,
        onPressRight,
        onPressRightSecond,
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
                borderBottomWidth={isImageBg ? 0 : 1}
                borderBottomColor={isImageBg ? undefined : colors.gray4}>
                {isImageBg ? (
                    <ImageApp source={Images.bgImg1} style={styles.image} />

                ) : null}
                <SafeAreaView edges={['top']} />
                <Row height={scaler(40)}>
                    <Row width={WidthIcon} height={'100%'}>
                        {navigation?.canGoBack() && goBack ? (
                            <IconButton
                                IconSvg={Icons.BackLeft}
                                stylePressable={styles.buttonIcon(true)}
                                height="100%"
                                onPress={() => {
                                    !!onPressLeft ? onPressLeft() : navigation.goBack();
                                }}
                            />
                        ) : null}
                    </Row>
                    <Box flex={1}>
                        <TextApp
                            weight={700}
                            size={FontSize.Font16}
                            textAlign="center"
                            color={isImageBg ? colors.white : colors.text}>
                            {title}
                        </TextApp>
                    </Box>
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