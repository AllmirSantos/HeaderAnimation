import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} from "react-native";

const H_MAX_HEIGTH = 250;
const H_MIN_HEIGTH = 70;
const H_SCROLL_DISTANCE = H_MAX_HEIGTH - H_MIN_HEIGTH;

export default function App() {
  const data = [
    { id: "1", title: "Item 01" },
    { id: "2", title: "Item 02" },
    { id: "3", title: "Item 03" },
    { id: "4", title: "Item 04" },
    { id: "5", title: "Item 05" },
  ];

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGTH, H_MIN_HEIGTH],
    extrapolate: "clamp",
  });

  const imageScaleHeight = scrollOffsetY.interpolate({
    inputRange: [0, 150],
    outputRange: [200, 50],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#121212"
        barStyle="light-content"
        translucent={false}
      />
      <Animated.View
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          elevation: 3,
          zIndex: 99,
          height: headerScrollHeight,
          padding: 10,
          backgroundColor: "#00FA9A",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Animated.Image
          source={require("./src/image/01.png")}
          style={{
            width: 200,
            height: imageScaleHeight,
          }}
          resizeMode="contain"
        />
      </Animated.View>
      <FlatList
        style={{ paddingTop: H_MAX_HEIGTH }}
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.id}</Text>
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    padding: 20,
    borderBottomWidth: 2,
    borderColor: "#cecece",
  },
});
