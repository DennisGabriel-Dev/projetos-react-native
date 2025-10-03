import { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#FFFFFF");
  useEffect(() => {
    setColor(count % 2 === 0 ? "#DFE6E9" : "#74B9FF");
    if(count === 5){
      console.log("Contador atingiu meio do caminho");
    }
  }, [count]); 

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color
      }}
    >
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Text>Count: {count}</Text>
    </View>
  );
}
