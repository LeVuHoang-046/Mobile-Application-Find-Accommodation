import { StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"

export const LinearGradientShadow = () => {
    return (
        <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0.3)',
              'rgba(0, 0, 0, 1)',
            ]}
            style={styles.shadow}
            />
    )
}
const styles = StyleSheet.create({
    shadow: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})