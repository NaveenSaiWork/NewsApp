import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../config/colors";
import routes from "../navigation/routes";
function NewsComponent({
  title,
  source,
  urlToImage,
  publishedAt,
  navigation,
  ...otherProps
}) {
  const heading = title.slice(0, 23) + "...";
  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past; // difference in milliseconds

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    if (diff < msPerMinute) {
      const seconds = Math.round(diff / 1000);
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    } else if (diff < msPerHour) {
      const minutes = Math.round(diff / msPerMinute);
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (diff < msPerDay) {
      const hours = Math.round(diff / msPerHour);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (diff < msPerMonth) {
      const days = Math.round(diff / msPerDay);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (diff < msPerYear) {
      const months = Math.round(diff / msPerMonth);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      const years = Math.round(diff / msPerYear);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        margin: 10,
      }}
      onPress={() =>
        navigation.navigate(routes.NEWS_DETAILED_SCREEN, {
          title,
          source,
          urlToImage,
          publishedAt,
          ...otherProps,
        })
      }
    >
      {urlToImage && (
        <View>
          <Image
            source={{ uri: urlToImage }}
            style={{ width: 100, height: 100 }}
            alt="news image"
            // onError={() => console.error("Image failed to load")}
          />
        </View>
      )}
      <View
        style={{
          position: "absolute",
          marginLeft: 110,
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{heading}</Text>

        <View style={{ flexDirection: "row", marginTop: 3 }}>
          <Text>{source?.name}</Text>
          <View style={{ marginLeft: 10 }}>
            <Entypo name="back-in-time" size={20} color={colors.star1} />
          </View>
          <Text style={{ marginLeft: 10 }}>{timeAgo(publishedAt)}</Text>
          <Text style={{ marginLeft: 10 }}>...</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NewsComponent;
