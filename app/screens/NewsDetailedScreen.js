import React from "react";
import Screen from "../components/Screen";
import { Text, View, Image, Linking } from "react-native";
import defaultstyles from "../config/styles";
import RenderHtml from "react-native-render-html";
function NewsDetailedScreen(props) {
  const { title, source, urlToImage, publishedAt, content, url } =
    props.route.params;
  console.log(title, source, urlToImage, publishedAt, content, url);
  return (
    <Screen>
      <View style={{ margin: 5 }}>
        <Image
          source={{ uri: urlToImage }}
          style={{ width: "160", height: 200 }}
          alt="news image"
        />
        <Text
          style={[
            defaultstyles.heading2,
            { marginLeft: 1, marginTop: 5, padding: 5 },
          ]}
        >
          {title}
        </Text>

        <Text style={[defaultstyles.text, { margin: 12 }]}>{content}</Text>
        <View style={{ alignSelf: "center" }}>
          <Text style={defaultstyles.subtextFlatlist}>
            Source : {source.name}
          </Text>
          <Text
            onPress={() => Linking.openURL(url)}
            style={defaultstyles.subtextFlatlist}
          >
            Click to read more
          </Text>
        </View>
      </View>
    </Screen>
  );
}

export default NewsDetailedScreen;
