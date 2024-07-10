import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import { IItemTabBar, ITabBar } from './TabNavigation';
import { FontSize, scaler } from '@themes';
import { Box, ButtonBase, Row, TextApp } from '@component';


type CustomTabBarProps = BottomTabBarProps & {
  tabBar: ITabBar;
};
export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  tabBar,
}: CustomTabBarProps) => {
  const {theme} = useStyles();
  return (
    <Row
      color={theme.colors.white}
      pb={getBottomSpace() > 0 ? getBottomSpace() + scaler(18) : scaler(55)}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const Icon = tabBar[route.name].Icon;
        const label = tabBar[route.name]?.label;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarItem
            key={route.key}
            Icon={Icon}
            active={isFocused}
            onPress={onPress}
            label={label}
          />
        );
      })}
    </Row>
  );
};

type TabBarItemProps = {
  active: boolean;
  onPress: () => void;
} & Omit<IItemTabBar, 'name' | 'route'>;

const TabBarItem = ({Icon, active, onPress, label}: TabBarItemProps) => {
  const {
    styles,
    theme: {colors},
  } = useStyles(stylesheet);

//   const isSchedule = label === LabelTab.Schedule;
  const colorIcon = useMemo(() => {
    // if (isSchedule) {
    //   return colors.white;
    // }
    return active ? colors.tint : colors.gray3;
  }, [label, active]);
  return (
    <Box flex={1} height={scaler(60)}>
      <ButtonBase
        onPress={onPress}
        stylePressable={styles.stylePressable}
        scaleTo={0.9}>
        <Box flex={1} height={scaler(50)} justify="flex-end" align="center">
          {/* {isSchedule ? (
            <Center
              p={scaler(12)}
              color={colors.tint}
              position="absolute"
              top={-20}
              borderRadius={scaler(23)}>
              <Icon stroke={colorIcon} />
            </Center>
          ) : ( */}
            <Box mb={scaler(8)}>
              <Icon size={24} stroke={colorIcon} />
            </Box>
          {/* )} */}
          <>
            {!!label && (
              <TextApp
                weight={400}
                size={FontSize.Font10}
                textAlign="center"
                color={active ? colors.tint : colors.text}>
                {label}
              </TextApp>
              
            )}
          </>
        </Box>
      </ButtonBase>
    </Box>
  );
};

const stylesheet = createStyleSheet(() => ({
  stylePressable: {
    flex: 1,
  },
}));
